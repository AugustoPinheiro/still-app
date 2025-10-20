import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import SelectIcon from '@/assets/images/selectIcon.svg';
import { Button } from '@/components/Button';
import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { ProgressBar } from '@/components/ProgressBar';
import { getInspirationsUpload, setInspirationsUpload, storage } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { CardFolder } from '@/modules/Closet/components/CardFolder';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { InspirationsEmpty } from '@/modules/Closet/screens/Inspirations/empty';
import { postInspirations } from '@/modules/Closet/services/closet.services';

import * as S from './styles';

export function Inspirations() {
  const [localInspirationsUpload, setLocalInspirationsUpload] = useState(getInspirationsUpload());

  const navigation = useNavigation();

  const {
    clearSelectedInspirationsItems,
    dispatch,
    expandBottomSheet,
    folders,
    handleSelectInspirations,
    inspirations,
    isItemSelectedInspirations,
    isSelectingInspirations,
    refetchInspirations,
    selectedInspirationsItems,
    setSelectedFolder,
    closeBottomSheet,
    isLoading,
    setCurrentTab,
    setInspiration,
  } = useCloset();

  const foldersWithInspirations = folders?.filter((item) => item._count.inspirations > 0);

  const { show } = useToast();

  useEffect(() => {
    const listenerStorage = storage.addOnValueChangedListener((key) => {
      if (key === 'inspirationsUpload') {
        const data = storage.getString('inspirationsUpload');

        if (!data) return;

        setLocalInspirationsUpload(JSON.parse(data));
      }
    });

    return () => {
      listenerStorage.remove();
    };
  }, []);

  function getProgress() {
    if (localInspirationsUpload.total === 0) return 0;

    return (localInspirationsUpload.uploaded * 100) / localInspirationsUpload.total;
  }

  function hadleGoToDetails(item) {
    closeBottomSheet();
    setSelectedFolder(item);

    navigation.navigate('FolderDetails', { title: item?.title });
  }

  async function showImagePicker() {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

      if (!cameraPermission.granted) {
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 1,
      });

      if (!result?.canceled) {
        await postInspirations(result.assets);
        await refetchInspirations();
      }
    } catch (err) {
      show({
        type: 'error',
        message: 'Não foi possível enviar as inspirações, tente novamente mais tarde.',
      });

      setInspirationsUpload({ total: 0, uploaded: 0 });
    } finally {
      setTimeout(() => {
        setInspirationsUpload({ total: 0, uploaded: 0 });
      }, 5000);
    }
  }

  useEffect(() => {
    setCurrentTab('inspiration');
  }, []);

  if (
    !isLoading &&
    !foldersWithInspirations?.length &&
    !inspirations?.length &&
    !localInspirationsUpload.total
  ) {
    return <InspirationsEmpty />;
  }

  return (
    <S.Container>
      <S.Content>
        <S.ButtonContainer>
          <Button
            title="Subir inspirações"
            onPress={showImagePicker}
            disabled={localInspirationsUpload.total > 0}
          />
        </S.ButtonContainer>

        {!localInspirationsUpload?.success && localInspirationsUpload.total > 0 && (
          <S.ContainerProgressBar>
            <S.ProgressBarText>
              {`Enviando ${localInspirationsUpload.uploaded} de ${localInspirationsUpload.total} inspirações...`}
            </S.ProgressBarText>
            <ProgressBar progress={getProgress()} />
          </S.ContainerProgressBar>
        )}

        {localInspirationsUpload?.success && localInspirationsUpload.total === 0 && (
          <S.ContainerSuccess onPress={() => setInspirationsUpload({ total: 0, uploaded: 0 })}>
            <S.Success>
              <MaterialCommunityIcons name="check" size={18} color="#fff" />
              <S.SuccessText>Inspirações enviadas!</S.SuccessText>
            </S.Success>
          </S.ContainerSuccess>
        )}
      </S.Content>
      {isLoading ? (
        <Loading hasBackground={false} />
      ) : (
        <S.Content>
          {foldersWithInspirations?.length ? (
            <S.Section>
              <S.SectionHeader>
                <S.SectionTitle>MINHAS PASTAS</S.SectionTitle>

                <S.SectionButton
                  onPress={() => navigation.navigate('AllFolders', { from: 'inspirations' })}
                >
                  <S.SectionButtonText>Ver todas</S.SectionButtonText>
                </S.SectionButton>
              </S.SectionHeader>

              <FlatList
                data={foldersWithInspirations}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ gap: 16 }}
                renderItem={({ item }) => (
                  <CardFolder
                    item={item}
                    onPress={() => {
                      if (!dispatch) return;
                      setSelectedFolder(item);
                      dispatch({ type: 'folder' });
                      expandBottomSheet();
                    }}
                    onCardPress={() => hadleGoToDetails(item)}
                    from="inspirations"
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </S.Section>
          ) : (
            <></>
          )}

          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>TODAS AS INSPIRAÇÕES</S.SectionTitle>

              {!isSelectingInspirations && (
                <S.SectionButtonContainer>
                  <S.SectionButton
                    onPress={() => {
                      if (!dispatch || !inspirations?.length) return;

                      dispatch({ type: 'inspirations' });
                      isSelectingInspirations
                        ? clearSelectedInspirationsItems()
                        : handleSelectInspirations(inspirations[0]);
                    }}
                  >
                    <SelectIcon width={20} height={20} />
                  </S.SectionButton>
                </S.SectionButtonContainer>
              )}
            </S.SectionHeader>

            {isSelectingInspirations && !!selectedInspirationsItems.length && (
              <S.CountContainer>
                <S.CountText>
                  {selectedInspirationsItems.length === 1
                    ? '1 inspiração selecionada'
                    : `${selectedInspirationsItems.length} inspirações selecionadas`}
                </S.CountText>
                <S.CountButtonContainer>
                  <Button
                    title="Cancelar"
                    type="primary"
                    onPress={clearSelectedInspirationsItems}
                    marginBottom={0}
                    weight="flat"
                  />
                </S.CountButtonContainer>
              </S.CountContainer>
            )}

            <CardsImage
              data={inspirations}
              isSelecting={isSelectingInspirations}
              onPress={handleSelectInspirations}
              isItemSelected={isItemSelectedInspirations}
              onClickItem={setInspiration}
              hasTitle={false}
              hasStyle
            />
          </S.Section>
        </S.Content>
      )}
    </S.Container>
  );
}
