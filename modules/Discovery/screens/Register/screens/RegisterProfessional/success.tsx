import React from 'react';

import TickCircleIcon from '@/assets/images/tick-circle.svg';
import { Button } from '@/components/Button';

import * as S from './styles';

export function SuccessRegisterProfessional() {
  return (
    <S.Container>
      <S.SuccessWrapper>
        <S.TitleSuccess>Cadastro realizado com sucesso</S.TitleSuccess>
        <TickCircleIcon />
        <S.SubtitleSuccess>Enviaremos email se for aprovado</S.SubtitleSuccess>
      </S.SuccessWrapper>

      <S.ButtonContent>
        <Button title="Ok, entendi" />
      </S.ButtonContent>
    </S.Container>
  );
}
