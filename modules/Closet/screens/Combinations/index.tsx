import React, { useCallback, useEffect } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';

import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';

import FilterIcon from '@/assets/images/filterIcon.svg';
import PlusIcon from '@/assets/images/plusIcon.svg';
import SelectIcon from '@/assets/images/selectIcon.svg';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { CardFolder } from '@/modules/Closet/components/CardFolder';
import { ImageWithLabel } from '@/modules/Closet/components/ImageWithLabel';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { CombinationsEmpty } from '@/modules/Closet/screens/Combinations/empty';

import { NewSuggestionsCard } from '../../components/NewSuggestionsCard';
import * as S from './styles';

export function Combinations() {
  const navigation = useNavigation();
  const {
    looks,
    setLooks,
    refetchLooks,
    expandBottomSheet,
    dispatch,
    clearSelectedLooksItems,
    isSelectingLooks,
    isItemSelectedLook,
    selectedLooksItems,
    handleSelectLook,
    isLoading,
    setSearchLook,
    searchLook,
    folders,
    setSelectedFolder,
    setCurrentTab,
    filtersLook,
    refetchLooksSuggestions,
    setLooksSuggestions,
    looksSuggestions,
    isFetchingNextPageLooks,
  } = useCloset();
  const hasCombinations = looks?.length;
  const foldersWithLooks = folders?.filter((item) => item._count.looks > 0);
  const { width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      refetchLooksSuggestions();
      setLooksSuggestions(looksSuggestions);
      refetchLooks();
      setLooks(looks);
    }, [])
  );

  function hadleGoToDetails(item) {
    setSelectedFolder(item);

    navigation.navigate('FolderDetails', { title: item?.title });
  }

  const renderFolders = useCallback(
    ({ item }: any) => (
      <CardFolder
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
    [setSelectedFolder, dispatch, expandBottomSheet]
  );

  const renderLook = useCallback(
    ({ item }: any) => {
      const isItemSelected = isItemSelectedLook(item);
      return (
        <ImageWithLabel
          item={item}
          isItemSelected={isItemSelected}
          isSelecting={isSelectingLooks}
          hasTitle
          onPress={handleSelectLook}
          onClickItem={(item) => navigation.navigate('NewLookEdit', { look: item })}
        />
      );
    },
    [isSelectingLooks, isItemSelectedLook]
  );

  useEffect(() => {
    setCurrentTab('look');
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading hasBackground={true} />
      ) : (
        <S.Container>
          {looksSuggestions?.length ? <NewSuggestionsCard /> : <></>}
          {!isLoading && !hasCombinations && !looks?.length && !searchLook && !filtersLook ? (
            <CombinationsEmpty />
          ) : (
            <>
              <S.SearchContainer>
                <Search
                  placeholder="Busque pela descrição"
                  onChangeText={(value) => setSearchLook(value)}
                  value={searchLook}
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
                {foldersWithLooks?.length ? (
                  <S.Section>
                    <S.SectionHeader>
                      <S.SectionTitle>MINHAS PASTAS</S.SectionTitle>

                      <S.SectionButton
                        onPress={() => navigation.navigate('AllFolders', { from: 'looks' })}
                      >
                        <S.SectionButtonText>Ver todas</S.SectionButtonText>
                      </S.SectionButton>
                    </S.SectionHeader>

                    <FlatList
                      data={foldersWithLooks}
                      keyExtractor={(item) => String(item.id)}
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
                    <S.SectionTitle>MEUS LOOKS</S.SectionTitle>

                    {!isSelectingLooks && (
                      <S.SectionButtonContainer>
                        <S.SectionButton
                          onPress={() => {
                            if (!dispatch || !looks?.length) return;
                            dispatch({ type: 'combinations' });
                            isSelectingLooks
                              ? clearSelectedLooksItems()
                              : handleSelectLook(looks[0]);
                          }}
                        >
                          <SelectIcon width={20} height={20} />
                        </S.SectionButton>
                        <S.SectionButton
                          onPress={() => {
                            const routes = {
                              index: 0,
                              routes: [{ name: 'Closet', params: { screenTo: 'NewLook' } }],
                            };

                            navigation?.dispatch(CommonActions.reset(routes));
                          }}
                        >
                          <PlusIcon width={20} height={20} />
                        </S.SectionButton>
                      </S.SectionButtonContainer>
                    )}
                  </S.SectionHeader>

                  {isSelectingLooks && !!selectedLooksItems.length && (
                    <S.CountContainer>
                      <S.CountText>
                        {selectedLooksItems.length === 1
                          ? '1 peça selecionada'
                          : `${selectedLooksItems.length} peças selecionadas`}
                      </S.CountText>
                      <S.CountButtonContainer>
                        <Button
                          title="Cancelar"
                          type="primary"
                          onPress={clearSelectedLooksItems}
                          marginBottom={0}
                          weight="flat"
                        />
                      </S.CountButtonContainer>
                    </S.CountContainer>
                  )}

                  {/* <CardsImage
                    data={looks}
                    onPress={handleSelectLook}
                    isSelecting={isSelectingLooks}
                    isItemSelected={isItemSelectedLook}
                    onClickItem={(item) => navigation.navigate('NewLookEdit', { look: item })}
                    hasTitle={false}
                  /> */}

                  <FlatList
                    data={looks}
                    decelerationRate="fast"
                    keyExtractor={(item, index) => `${item?.id}_${index}`}
                    contentContainerStyle={{
                      gap: 16,
                      paddingRight: 16,
                      paddingBottom: 100,
                      flexWrap: 'wrap',
                      width: '100%',
                    }}
                    renderItem={renderLook}
                    horizontal
                    scrollEnabled={false}
                    maxToRenderPerBatch={8}
                    initialNumToRender={8}
                    ListFooterComponent={
                      isFetchingNextPageLooks ? (
                        <View
                          style={{
                            width: width - 54,
                          }}
                        >
                          <Loading hasBackground={false} />
                        </View>
                      ) : (
                        <></>
                      )
                    }
                  />
                </S.Section>
              </S.Content>
            </>
          )}
        </S.Container>
      )}
    </>
  );
}
