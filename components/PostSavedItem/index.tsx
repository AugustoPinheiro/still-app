import React from 'react';

import * as S from './styles';

export interface PostSavedItemProps {
  description: string;
  items: number;
  images: string[];
  marginAuto?: boolean;
  onPress?: (item: any) => void;
}

export function PostSavedItem({
  description,
  items,
  images,
  marginAuto,
  onPress,
}: PostSavedItemProps) {
  return (
    <S.Container marginAuto={marginAuto} onPress={onPress}>
      <S.UserPhotosContainer>
        {items > 3 ? (
          images
            .slice(0, 4)
            .map((item, index) => (
              <S.UserPhotoMore index={index} key={item} source={{ uri: item }} cachePolicy="disk" />
            ))
        ) : (
          <S.UserPhoto source={{ uri: images[0] }} cachePolicy="disk" />
        )}
      </S.UserPhotosContainer>
      <S.LabelTitle numberOfLines={2} ellipsizeMode="tail">
        {description}
      </S.LabelTitle>
      <S.Label numberOfLines={2} ellipsizeMode="tail">
        {items} ite{items > 1 ? 'ns' : 'm'}
      </S.Label>
    </S.Container>
  );
}
