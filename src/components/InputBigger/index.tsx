import React from 'react';
import { type TextInputProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

type TInputProps = TextInputProps & {
  label?: string;
  marginBottom?: number;
  width?: string;
  error?: string;
  success?: string;
};

export function InputBigger({ marginBottom, label, error, success, ...props }: TInputProps) {
  const theme = useTheme();
  return (
    <S.Container marginBottom={marginBottom}>
      <S.Label>{label}</S.Label>

      <S.InputContainer>
        <S.Input {...props} error={!!error} multiline placeholderTextColor={theme.colors.gray05} />
      </S.InputContainer>

      {error && <S.ErrorText>{error}</S.ErrorText>}
      {success && <S.SuccessText>{success}</S.SuccessText>}
    </S.Container>
  );
}
