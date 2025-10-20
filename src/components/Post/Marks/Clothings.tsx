import React from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

type Props = {
  clothings: SocialFeedType['clothing'];
};

export function Clothings({ clothings }: Props) {
  return (
    <S.Container>
      <BottomSheetFlatList
        data={clothings}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        keyExtractor={(item) => String(item?.clothing_id)}
        renderItem={({ item }) => (
          <S.Content>
            <S.Image
              source={{ uri: item?.clothing?.image }}
              recyclingKey={item?.clothing?.image}
              cachePolicy="disk"
            />
            <S.Title>{item?.clothing?.title}</S.Title>
          </S.Content>
        )}
      />
    </S.Container>
  );
}
