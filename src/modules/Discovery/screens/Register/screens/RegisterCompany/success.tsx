import React from 'react';

import { useNavigation } from '@react-navigation/native';

import TickCircleIcon from '@/assets/images/tick-circle.svg';
import { Button } from '@/components/Button';

import * as S from './styles';

export function SuccessRegisterCompany() {
  const navigation = useNavigation();
  return (
    <S.Container>
      <S.SuccessWrapper>
        <S.TitleSuccess>Cadastro realizado com sucesso</S.TitleSuccess>
        <TickCircleIcon />
        <S.SubtitleSuccess>Enviaremos email se for aprovado</S.SubtitleSuccess>
      </S.SuccessWrapper>

      <S.ButtonContent>
        <Button title="Ok, entendi" onPress={() => navigation.navigate('TabRoutes')} />
      </S.ButtonContent>
    </S.Container>
  );
}
