import React from 'react';

import { Button } from '@/components/Button';

import * as S from './styles';

interface GenderModalProps {
  onSelectFeminine: () => void;
  onSelectMasculine: () => void;
  isSettings?: boolean;
}

export function GenderModal({
  onSelectFeminine,
  onSelectMasculine,
  isSettings = false,
}: GenderModalProps) {
  return (
    <S.Container>
      <S.WrapperText>
        {isSettings ? (
          <S.Title>Selecione o questionário que deseja responder.</S.Title>
        ) : (
          <>
            <S.Title>Por onde quer começar?</S.Title>
            <S.SubTitle>Selecione o questionário que deseja responder.</S.SubTitle>
          </>
        )}
      </S.WrapperText>
      <S.WrapperButtons>
        <Button title="Moda feminina" type="secondary" onPress={onSelectFeminine} />
        <Button title="Moda masculina" type="secondary" onPress={onSelectMasculine} />
      </S.WrapperButtons>
    </S.Container>
  );
}
