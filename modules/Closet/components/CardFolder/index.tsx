import React from 'react';

import { useQuery } from '@tanstack/react-query';

import DotsHorizontalIcon from '@/assets/images/dotsHorizontalIcon.svg';
import { Loading } from '@/components/Loading';
import { getClosetFolderById } from '@/modules/Closet/services/closet.services';
import { ClosetFolderType } from '@/types/ClosetFolderType';

import * as S from './styles';

type CardFolderProps = {
  item: ClosetFolderType;
  onPress?: () => void;
  onCardPress?: () => void;
  flexBasis?: string;
  marginBottom?: number;
  hasOptions?: boolean;
  from?: 'clothings' | 'looks' | 'inspirations';
  full?: boolean;
};

export function CardFolder({
  item,
  onPress,
  onCardPress,
  hasOptions = true,
  flexBasis,
  marginBottom,
  from,
  full,
}: CardFolderProps) {
  const count = item._count.clothings + item._count.looks + item._count.inspirations;

  const { data, isLoading } = useQuery({
    queryKey: ['folder', item.id],
    queryFn: async () => await getClosetFolderById(item?.id),
  });

  if (!item) return <></>;

  let imageSource = '';

  if (data?.clothings?.length) {
    imageSource = data.clothings[0].image;
  } else if (data?.looks?.length) {
    imageSource = data.looks[0].image;
  } else if (data?.inspirations?.length) {
    imageSource = data.inspirations[0].image;
  }

  if (from === 'inspirations') {
    imageSource = data?.inspirations?.length ? data.inspirations[0].image : imageSource;
  }

  return (
    <S.Container
      flexBasis={flexBasis}
      marginBottom={marginBottom}
      onPress={onCardPress}
      full={full}
    >
      {isLoading ? (
        <S.LoadingContainer>
          <Loading hasBackground={false} />
        </S.LoadingContainer>
      ) : (
        <S.CardImage
          source={{ uri: imageSource }}
          recyclingKey={imageSource}
          contentFit="cover"
          cachePolicy="disk"
        />
      )}

      <S.CardBottom>
        <S.CardBottomRow>
          <S.CardTitle numberOfLines={1}>{item.title}</S.CardTitle>
          {hasOptions && (
            <S.CardOptionButton onPress={onPress}>
              <DotsHorizontalIcon />
            </S.CardOptionButton>
          )}
        </S.CardBottomRow>
        <S.CardCountText>{count} itens</S.CardCountText>
      </S.CardBottom>
    </S.Container>
  );
}
