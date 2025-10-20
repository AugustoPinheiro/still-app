import React, { useCallback, useEffect } from 'react';
import { View, useWindowDimensions, FlatList, Platform } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';

import FilterIcon from '@/assets/images/filterIcon.svg';
import PlusIcon from '@/assets/images/plusIcon.svg';
import SelectIcon from '@/assets/images/selectIcon.svg';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { CardFolder } from '@/modules/Closet/components/CardFolder';
import { ImageWithLabel } from '@/modules/Closet/components/ImageWithLabel';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { ClothingPartsEmpty } from '@/modules/Closet/screens/ClothingParts/empty';

import * as S from './styles';

export function ClothingParts() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { close } = useBottomSheet();
  const {
    setSelectedFolder,
    expandBottomSheet,
    dispatch,
    isSelectingClothings,
    isItemSelectedClothing,
    handleSelectClothing,
    clearSelectedClothingsItems,
    folders,
    clothings,
    selectedClothingsItems,
    isLoading,
    setSearchClothing,
    searchClothing,
    setCurrentTab,
    isFetching,
    filtersClothing,
    isFetchingNextPageClothings,
  } = useCloset();

  const foldersWithClothings = folders?.filter((item) => item._count.clothings > 0);

  useEffect(() => {
    setCurrentTab('clothing');
  }, []);

  function handleGoToClothingDetails(item: any) {
    navigation.navigate('ClothingDetails', { item });
  }

  function hadleGoToDetails(item) {
    setSelectedFolder(item);

    navigation.navigate('FolderDetails', { title: item?.title });
  }

  const renderFolders = useCallback(
    ({ item, index }) => (
      <CardFolder
        key={`${item?.id}_${index}`}
        item={item}
        onPress={() => {
          if (!dispatch) return;
          setSelectedFolder(item);
          dispatch({ type: 'folder' });
          expandBottomSheet();
        }}
        onCardPress={() => hadleGoToDetails(item)}
      />
    ),
    [setSelectedFolder, expandBottomSheet, hadleGoToDetails]
  );

  const renderClothing = useCallback(
    ({ item }: any) => {
      const isItemSelected = isItemSelectedClothing(item);

      return (
        <ImageWithLabel
          item={item}
          hasTitle
          isItemSelected={isItemSelected}
          isSelecting={isSelectingClothings}
          onPress={handleSelectClothing}
          onClickItem={handleGoToClothingDetails}
        />
      );
    },
    [isSelectingClothings, isItemSelectedClothing]
  );

  if (!isLoading && !isFetching && !clothings?.length && !searchClothing && !filtersClothing) {
    return <ClothingPartsEmpty />;
  }

  return (
    <S.Container>
      <S.SearchContainer>
        <Search
          placeholder="Busque pela descrição"
          onChangeText={(value) => setSearchClothing(value)}
          value={searchClothing}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />

        <S.ButtonIcon
          onPress={() => {
            if (!dispatch) return;

            dispatch({ type: 'filters' });
            expandBottomSheet();
          }}
        >
          <FilterIcon width={24} height={24} />
        </S.ButtonIcon>
      </S.SearchContainer>

      <S.Content>
        {isLoading && <Loading />}
        {foldersWithClothings?.length ? (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>MINHAS PASTAS</S.SectionTitle>

              <S.SectionButton
                onPress={() => navigation.navigate('AllFolders', { from: 'clothings' })}
              >
                <S.SectionButtonText>Ver todas</S.SectionButtonText>
              </S.SectionButton>
            </S.SectionHeader>

            <FlatList
              data={foldersWithClothings}
              decelerationRate="fast"
              keyExtractor={(item, index) => `${item?.id}_${index}`}
              contentContainerStyle={{ gap: 16, paddingRight: 16 }}
              renderItem={renderFolders}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </S.Section>
        ) : (
          <></>
        )}

        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>MINHAS PEÇAS</S.SectionTitle>

            {!isSelectingClothings && (
              <S.SectionButtonContainer>
                <S.SectionButton
                  onPress={() => {
                    if (!dispatch || !clothings?.length) return;

                    dispatch({ type: 'part' });
                    isSelectingClothings
                      ? clearSelectedClothingsItems()
                      : handleSelectClothing(clothings[0]);
                  }}
                >
                  <SelectIcon width={20} height={20} />
                </S.SectionButton>
                <S.SectionButton
                  onPress={() => {
                    const routes = {
                      index: 0,
                      routes: [{ name: 'Closet', params: { screenTo: 'NewClothingPart' } }],
                    };

                    close();

                    navigation?.dispatch(CommonActions.reset(routes));
                  }}
                >
                  <PlusIcon width={20} height={20} />
                </S.SectionButton>
              </S.SectionButtonContainer>
            )}
          </S.SectionHeader>

          {isSelectingClothings && !!selectedClothingsItems?.length && (
            <S.CountContainer>
              <S.CountText>
                {selectedClothingsItems?.length === 1
                  ? '1 peça selecionada'
                  : `${selectedClothingsItems?.length} peças selecionadas`}
              </S.CountText>
              <S.CountButtonContainer>
                <Button
                  title="Cancelar"
                  type="primary"
                  onPress={clearSelectedClothingsItems}
                  marginBottom={0}
                  weight="flat"
                />
              </S.CountButtonContainer>
            </S.CountContainer>
          )}

          <FlatList
            data={clothings}
            decelerationRate="fast"
            keyExtractor={(item, index) => `${item?.id}_${index}`}
            contentContainerStyle={{
              gap: 16,
              paddingRight: 16,
              paddingBottom: 100,
              flexWrap: 'wrap',
              width: '100%',
            }}
            renderItem={renderClothing}
            horizontal
            scrollEnabled={false}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            removeClippedSubviews={Platform.OS !== 'android'}
            ListFooterComponent={
              isFetchingNextPageClothings ? (
                <View style={{ width: width - 54 }}>
                  <Loading hasBackground={false} />
                </View>
              ) : (
                <></>
              )
            }
          />
        </S.Section>
      </S.Content>
    </S.Container>
  );
}
