import React from 'react';

import { useTheme } from 'styled-components/native';

import { ISelectUserOrStore } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';

import * as S from './styles';

interface IMarkPictureProps {
  user: ISelectUserOrStore;
  lastItem?: boolean;
  toggleSelectedItem: (user: ISelectUserOrStore) => void;
  hasRemove?: boolean;
  type: 'common' | 'store' | 'professional';
}

export function MarkPictureRow({
  user,
  lastItem,
  toggleSelectedItem,
  hasRemove,
  type,
}: IMarkPictureProps) {
  const theme = useTheme();

  function getProfileByType() {
    switch (type) {
      case 'common':
        return user.common_profile;
      case 'store':
        return user.store_profile;
      case 'professional':
        return user.professional_profile;
      default:
        return user.common_profile;
    }
  }

  const profile = getProfileByType();

  return (
    <S.Container hiddenBorderBottom={lastItem} onPress={() => toggleSelectedItem(user)}>
      <S.UserPhoto
        key={profile?.avatar}
        source={{ uri: profile?.avatar }}
        cachePolicy="disk"
        resizeMode="cover"
      />
      <S.UserDataContainer>
        <S.AtNameText>{[profile?.name, profile?.last_name].join(' ')}</S.AtNameText>
        <S.TimeText>@{user.username}</S.TimeText>
      </S.UserDataContainer>
      {hasRemove && (
        <S.RemoveIcon onPress={() => toggleSelectedItem(user)}>
          <S.Icon name="x" size={theme.fontSizes.MD} />
        </S.RemoveIcon>
      )}
    </S.Container>
  );
}
