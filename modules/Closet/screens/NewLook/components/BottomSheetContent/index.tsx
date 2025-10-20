import React, { useCallback } from 'react';
import { Platform } from 'react-native';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { ClosetClothingType } from '@/types/ClosetClothingType';

import { ImageContent } from './ImageContent';
import * as S from './styles';

type BottomSheetContentProps = {
  onItemSelect: (item: ClosetClothingType) => void;
  selectedItems: ClosetClothingType[];
};

export function BottomSheetContent({ onItemSelect, selectedItems }: BottomSheetContentProps) {
  const {
    clothings,
    isLoadingClothings,
    hasNextPageClothings,
    isFetchingNextPageClothings,
    fetchNextPageClothings,
    setSearchClothing,
    searchClothing,
  } = useCloset();

  const renderItem = useCallback(
    ({ item, index }: { item: ClosetClothingType; index: number }) => (
      <ImageContent item={item} onItemSelect={onItemSelect} selectedItems={selectedItems} />
    ),
    []
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Adicionar novas peças</S.Title>
      </S.Header>

      <S.SearchContainer>
        <Search
          placeholder="Busque pela descrição"
          onChangeText={(value) => setSearchClothing(value)}
          value={searchClothing}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </S.SearchContainer>
      {isLoadingClothings ? (
        <S.LoadingContainer>
          <Loading hasBackground={false} />
        </S.LoadingContainer>
      ) : (
        <></>
      )}
      <BottomSheetFlatList
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={{ gap: 16 }}
        decelerationRate={Platform.OS === 'ios' ? 0.993 : 0.94}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        data={clothings}
        keyExtractor={(item, index) => `${item?.id}_${index}`}
        renderItem={renderItem}
        maxToRenderPerBatch={9}
        initialNumToRender={9}
        onEndReached={() => {
          if (isFetchingNextPageClothings || !hasNextPageClothings) return;
          fetchNextPageClothings();
        }}
        ListEmptyComponent={() =>
          isLoadingClothings ? <></> : <S.EmptyListText>Nenhuma peça encontrada</S.EmptyListText>
        }
        onEndReachedThreshold={1}
        ListFooterComponent={() =>
          isFetchingNextPageClothings ? <Loading hasBackground={false} /> : <></>
        }
      />
    </S.Container>
  );
}
