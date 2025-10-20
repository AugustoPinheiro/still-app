import React from 'react';

import { StackActions, useNavigation } from '@react-navigation/native';

import TickCircle from '@/assets/images/tick-circle.svg';
import { Button } from '@/components/Button';

import * as S from './styles';

export function Success() {
  const navigation = useNavigation<any>();

  function handleGoToHome() {
    navigation.dispatch(StackActions.pop(3));
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
