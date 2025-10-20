import React from 'react';

import { useNavigation } from '@react-navigation/native';

import TickCircle from '@/assets/images/tick-circle.svg';
import { Button } from '@/components/Button';

import * as S from './styles';

export function Success() {
  const navigation = useNavigation<any>();

  function handleGoToHome() {
    navigation.navigate('Feed');
  }

  return (
    <S.Container>
      <S.Content>
        <TickCircle />
        <S.Title>Avaliação enviada com sucesso</S.Title>
      </S.Content>
      <S.ButtonContainer>
        <Button title="Ok" width={320} onPress={handleGoToHome} />
      </S.ButtonContainer>
    </S.Container>
  );
}
