import React from 'react';

// import Pinchable from 'react-native-pinchable';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type Props = {
  item: ClosetClothingType | ClosetInspirationType | ClosetLookType;
  onPress?: (item: any) => void;
  isSelecting?: boolean;
  isItemSelected?: (item: any) => boolean;
  onClickItem?: (item: any) => void;
  hasTitle?: boolean;
  hasStyle?: boolean;
  removeItem?: (item: any) => void;
  index: number;
};

export function CardImage({
  item,
  hasStyle,
  hasTitle,
  isItemSelected,
  isSelecting,
  onClickItem,
  onPress,
  removeItem,
  index,
}: Props) {
  return (
    // <Pinchable>
    <S.Container>
      <S.Card
        key={item.id}
        onPress={(e) => {
          isSelecting ? onPress?.(item) : onClickItem?.(item);
        }}
        onLongPress={() => onPress?.(item)}
      >
        {removeItem && (
          <S.RemoveButton onPress={() => removeItem(item.id)}>
            <MaterialCommunityIcons name="close" size={18} color="#FFF" />
          </S.RemoveButton>
        )}
        <S.CardImageContainer hasStyle={hasStyle} isOdd={hasStyle && (index + 1) % 2 !== 0}>
          <S.CardImage source={item.image} contentFit="cover" recyclingKey={item?.image} />

          {isSelecting && isItemSelected?.(item) && (
            <S.ImageOverlayCheck>
              <MaterialCommunityIcons name="check" size={48} color="#FFF" />
            </S.ImageOverlayCheck>
          )}
        </S.CardImageContainer>
        {hasTitle && (
          <S.CardBottom>
            <S.CardBottomRow>
              <S.CardTitle numberOfLines={1}>{item.title}</S.CardTitle>
            </S.CardBottomRow>
          </S.CardBottom>
        )}
      </S.Card>
    </S.Container>
    // </Pinchable>
  );
}
