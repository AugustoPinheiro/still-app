import React from 'react';
import { type TextInputProps } from 'react-native';

import * as S from './styles';

type TInputProps = TextInputProps & {
  width?: string;
  error?: string;
};

export function Search({ error, ...props }: TInputProps) {
  return (
    <S.Container>
      <S.InputContainer error={!!error}>
        <S.Icon />
        <S.Input {...props} error={!!error} />
      </S.InputContainer>

      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
}
