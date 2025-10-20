import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type Props = {
  item: ClosetClothingType | ClosetInspirationType | ClosetLookType | undefined;
  onPress?: (item: any) => void;
  isSelecting?: boolean;
  isItemSelected?: boolean;
  onClickItem?: (item: any) => void;
  hasTitle?: boolean;
  removeItem?: (item: any) => void;
};

export function ImageWithLabel({
  item,
  isSelecting,
  removeItem,
  onClickItem,
  onPress,
  hasTitle,
  isItemSelected,
}: Props) {
  return (
    <S.Container
      onPress={() => (isSelecting ? onPress?.(item) : onClickItem?.(item))}
      onLongPress={() => onPress?.(item)}
    >
      {removeItem && (
        <S.RemoveButton
          onPress={() =>
            removeItem(item?.clothing_id || item?.look_id, item?.look_id !== undefined)
          }
        >
          <MaterialCommunityIcons name="close" size={18} color="#FFF" />
        </S.RemoveButton>
      )}
      <S.CardImageContainer>
        <S.CardImage
          source={{ uri: item?.image, height: 1000, width: 100, isAnimated: false }}
          recyclingKey={item?.image}
          contentFit="cover"
          contentPosition="center"
          cachePolicy={'none'}
        />
        {isSelecting && isItemSelected && (
          <S.ImageOverlayCheck>
            <MaterialCommunityIcons name="check" size={48} color="#FFF" />
          </S.ImageOverlayCheck>
        )}
      </S.CardImageContainer>
      {hasTitle && (
        <S.CardBottom>
          <S.CardBottomRow>
            <S.CardTitle numberOfLines={1}>{item?.title}</S.CardTitle>
          </S.CardBottomRow>
        </S.CardBottom>
      )}
    </S.Container>
  );
}
