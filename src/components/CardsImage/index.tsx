import React, { useMemo } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type CardImageProps = {
  data: ClosetClothingType[] | ClosetInspirationType[] | ClosetLookType[] | undefined;
  onPress?: (item: any) => void;
  isSelecting?: boolean;
  isItemSelected?: (item: any) => boolean;
  onClickItem?: (item: any) => void;
  hasTitle?: boolean;
  hasStyle?: boolean;
  removeItem?: (item: any) => void;
  isLooks?: boolean;
};

export function CardsImage({
  data,
  onPress,
  isSelecting,
  isItemSelected,
  onClickItem,
  hasTitle = true,
  hasStyle = false,
  removeItem,
  isLooks = false,
}: CardImageProps) {
  const [dataOdd, dataEven] = useMemo(() => {
    const odd = [];
    const even = [];

    for (const item of data) {
      if ((data?.indexOf(item) + 1) % 2 !== 0) {
        odd.push(item);
      } else {
        even.push(item);
      }
    }

    return [odd, even];
  }, [data]);

  if (!data?.length) return <></>;

  return (
    <S.Container>
      <S.Column>
        {dataOdd.map((item, index) => (
          <S.Card
            key={item.id}
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
            <S.CardImageContainer hasStyle={hasStyle} isOdd={hasStyle && (index + 1) % 2 !== 0}>
              <S.CardImage
                key={item?.image}
                source={{ uri: item?.image }}
                contentFit="cover"
                resizeMode="cover"
                contentPosition="center"
                recyclingKey={item?.image}
                cachePolicy="disk"
              />
              {isSelecting && isItemSelected?.(item) && (
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
          </S.Card>
        ))}
      </S.Column>
      <S.Column>
        {dataEven.map((item, index) => (
          <S.Card
            key={item.id}
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
            <S.CardImageContainer hasStyle={hasStyle} isOdd={(index + 1) % 2 === 0}>
              <S.CardImage
                source={{ uri: item.image }}
                recyclingKey={item.image}
                contentFit="cover"
                contentPosition="center"
                cachePolicy="disk"
              />
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
        ))}
      </S.Column>
    </S.Container>
  );
}
