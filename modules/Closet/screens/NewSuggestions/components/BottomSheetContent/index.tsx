import React from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
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
    isLoadingClosetClothing,
    hasNextPageClosetClothing,
    isFetchingNextPageClosetClothing,
    fetchNextPageClosetClothing,
    setSearchClosetClothing,
    searchClosetClothing,
  } = useAnotherProfile();

  return (
    <S.Container>
      <S.Header>
        <S.Title>Adicionar novas peças</S.Title>
      </S.Header>

      <S.SearchContainer>
        <Search
          placeholder="Busque pela descrição"
          onChangeText={(value) => setSearchClosetClothing(value)}
          value={searchClosetClothing}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </S.SearchContainer>

      <BottomSheetFlatList
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        ListFooterComponentStyle={{ paddingTop: 20, paddingBottom: 50 }}
        data={clothings}
        keyExtractor={(item, index) => `${item?.id}_${index}`}
        renderItem={({ item, index }) => (
          <ImageContent
            key={`${item?.id}_${index}`}
            item={item}
            onItemSelect={onItemSelect}
            selectedItems={selectedItems}
          />
        )}
        onEndReached={() => {
          if (isFetchingNextPageClosetClothing || !hasNextPageClosetClothing) return;
          fetchNextPageClosetClothing();
        }}
        ListEmptyComponent={() =>
          isLoadingClosetClothing ? (
            <></>
          ) : (
            <S.EmptyListText>Nenhuma peça encontrada</S.EmptyListText>
          )
        }
        onEndReachedThreshold={3}
        ListFooterComponent={() =>
          isFetchingNextPageClosetClothing ? <Loading hasBackground={false} /> : <></>
        }
      />
    </S.Container>
  );
}
