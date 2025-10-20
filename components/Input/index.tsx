import React from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

type TInputProps = TextInputProps & {
  label?: string;
  marginBottom?: number;
  width?: string;
  error?: string;
  success?: string;
  hasError?: boolean;
  isLoading?: boolean;
  rightIcon?: {
    name?: string;
    onPress?: () => void;
    color?: string;
    text?: string;
  };
  leftIcon?: {
    name?: string;
    onPress?: () => void;
    color?: string;
    text?: string;
  };
  paddingRight?: number;
  required?: boolean;
};

export function Input({
  marginBottom,
  label,
  error,
  success,
  rightIcon,
  hasError,
  leftIcon,
  isLoading,
  editable = true,
  paddingRight = 0,
  required = false,
  ...props
}: TInputProps) {
  return (
    <S.Container marginBottom={marginBottom}>
      {label ? (
        <S.TitleWrapper>
          <S.Label>{label}</S.Label>
          {required ? <S.RequiredText>*</S.RequiredText> : <></>}
        </S.TitleWrapper>
      ) : (
        <></>
      )}

      <S.InputContainer>
        {leftIcon?.name && (
          <S.LeftIcon
            name={leftIcon?.name ?? 'search'}
            onPress={leftIcon?.onPress}
            color={leftIcon?.color}
          />
        )}
        <S.Input
          autoCorrect={false}
          {...props}
          editable={editable}
          error={!!error || hasError}
          paddingLeft={!!leftIcon?.name}
          paddingRight={paddingRight}
        />
        {isLoading ? (
          <S.LoadingIcon size="small" />
        ) : (
          <>
            {rightIcon?.name && (
              <S.RightIcon
                name={rightIcon?.name ?? 'eye'}
                onPress={rightIcon?.onPress}
                color={rightIcon?.color}
              />
            )}
            {rightIcon?.text && (
              <S.RightIconTextButtom onPress={rightIcon?.onPress}>
                <S.ButtonText>{rightIcon?.text}</S.ButtonText>
              </S.RightIconTextButtom>
            )}
          </>
        )}
      </S.InputContainer>

      {error && <S.ErrorText>{error}</S.ErrorText>}
      {success && <S.SuccessText>{success}</S.SuccessText>}
    </S.Container>
  );
}
