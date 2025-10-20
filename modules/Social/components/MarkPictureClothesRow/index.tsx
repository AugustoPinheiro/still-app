import React from 'react';

import { useTheme } from 'styled-components/native';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

interface IMarkPictureProps {
  item: ClosetClothingType;
  toggleSelectedItem: (item: ClosetClothingType) => void;
}

export function MarkPictureClothesRow({ item, toggleSelectedItem }: IMarkPictureProps) {
  const theme = useTheme();

  return (
    <S.Container onPress={() => toggleSelectedItem(item)}>
      <S.UserPhotoContainer>
        <S.UserPhoto source={{ uri: item.image }} cachePolicy="disk" />
      </S.UserPhotoContainer>
      <S.UserDataContainer>
        <S.AtNameText>{item.title}</S.AtNameText>
      </S.UserDataContainer>

      <S.RemoveIcon onPress={() => toggleSelectedItem(item)}>
        <S.Icon name="x" size={theme.fontSizes.MD} />
      </S.RemoveIcon>
    </S.Container>
  );
}
