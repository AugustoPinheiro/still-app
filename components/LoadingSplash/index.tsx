import React from 'react';

import * as S from './styles';
import { Image } from 'react-native';

export function LoadingSplash() {
  return (
    <S.Container>
      <Image source={require('@assets/images/logo-post.png')} />
    </S.Container>
  );
}
