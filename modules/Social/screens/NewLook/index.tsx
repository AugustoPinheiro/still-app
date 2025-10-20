import React from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { NewClothingPartGallery } from '@/modules/Closet/screens/NewClothingPart/screens/NewClothingPartGallery';

import { SocialStackParamList } from '../../routes/social.types';
import * as S from './styles';

export function NewLook() {
  const navigation = useNavigation<NavigationProp<SocialStackParamList>>();

  const handleGoNewPost = (uri: string) => {
    navigation.navigate('NewPost', { uri });
  };

  return (
    <S.Container>
      <S.Content>
        <NewClothingPartGallery handleGoNewPost={handleGoNewPost} inNewPost />
      </S.Content>
    </S.Container>
  );
}
