import React from 'react';

import { useNavigation } from '@react-navigation/core';

import { SocialProfileType } from '@/types/SocialProfileType';

import * as S from './styles';

interface UserItemProps {
  user: SocialProfileType;
}

export function UserItem({ user }: UserItemProps) {
  const navigation = useNavigation();

  function getProfileUser() {
    if (user?.common_profile) {
      return user.common_profile;
    }

    if (user?.professional_profile) {
      return user.professional_profile;
    }

    if (user?.store_profile) {
      return user.store_profile;
    }
  }

  const profile = getProfileUser();

  function handleNavigateUser() {
    // @ts-expect-error
    navigation.navigate('Feed', {
      screen: 'AnotherUserProfile',
      params: {
        username: user.username,
        id: user.id,
        from: 'searchPeople',
      },
    });
  }

  return (
    <S.Container onPress={handleNavigateUser}>
      <S.UserPhoto source={{ uri: profile?.avatar }} cachePolicy="disk" />
      <S.LabelTitle numberOfLines={1}>{user?.username}</S.LabelTitle>
    </S.Container>
  );
}
