import React from 'react';

import { Button } from '@/components/Button';

import * as S from './styles';

export const BlockConfirmation = ({
  close,
  handleConfirm,
}: {
  close: () => void;
  handleConfirm: () => void;
}) => {
  return (
    <S.ContainerModal>
      <S.TitleModal>Deseja bloquear este usuário?</S.TitleModal>
      <S.ButtonContainer>
        <Button title="Sim" marginBottom={12} onPress={handleConfirm} />
        <Button title="Não" type="secondary" onPress={close} />
      </S.ButtonContainer>
    </S.ContainerModal>
  );
};
