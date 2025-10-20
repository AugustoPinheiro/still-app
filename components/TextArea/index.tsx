import React from 'react';
import { type TextInputProps } from 'react-native';

import * as S from './styles';

type TInputProps = TextInputProps & {
  label?: string;
  marginBottom?: number;
  width?: string;
  error?: string;
  rightIcon?: {
    name: string;
    onPress?: () => void;
    color?: string;
  };
};

export function TextArea({
  marginBottom,
  label,
  error,
  rightIcon,
  numberOfLines = 5,
  ...props
}: TInputProps) {
  return (
    <S.Container marginBottom={marginBottom}>
      <S.Label>{label}</S.Label>

      <S.InputContainer>
        <S.Input {...props} error={!!error} multiline={true} numberOfLines={numberOfLines} />
        {rightIcon?.name && (
          <S.RightIcon
            name={(rightIcon?.name ?? 'eye') as any}
            onPress={rightIcon?.onPress}
            color={rightIcon?.color}
          />
        )}
      </S.InputContainer>

      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
}
