import React, { useEffect, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
import { type MaskedTextInputProps } from 'react-native-mask-text';

import * as S from './styles';

type TInputProps = MaskedTextInputProps & {
  label?: string;
  marginBottom?: number;
  mask: 'CNPJ' | 'CPF' | 'TEL' | 'CEP' | 'currency' | 'credit_card' | 'card_exp_date';
  error?: string;
};

export function InputMask({
  marginBottom,
  label,
  mask,
  error,
  editable = true,
  ...props
}: TInputProps) {
  const customMask = useMemo(() => {
    switch (mask) {
      case 'CNPJ':
        return '99.999.999/9999-99';
      case 'CPF':
        return '999.999.999-99';
      case 'TEL':
        return '(99) 99999-9999';
      case 'CEP':
        return '99999-999';
      case 'credit_card':
        return '9999 9999 9999 9999';
      case 'card_exp_date':
        return '99/99';
      case 'currency':
      default:
        return '';
    }
  }, [mask]);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // this is a fix for when masked input would force value 0 instead of placeholder

    if ((!props.value || props.value === '0') && mask === 'currency') {
      inputRef.current?.clear();
    }
  }, [inputRef, props.value]);

  return (
    <S.Container marginBottom={marginBottom}>
      {label ? (
        <S.TitleWrapper>
          <S.Label>{label}</S.Label>
        </S.TitleWrapper>
      ) : (
        <></>
      )}

      <S.InputMask
        ref={inputRef}
        {...props}
        options={
          mask === 'currency'
            ? { prefix: 'R$', decimalSeparator: ',', groupSeparator: '.', precision: 2 }
            : {}
        }
        type={mask}
        mask={customMask}
        error={!!error}
        marginBottom={marginBottom}
        editable={editable}
      />

      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
}
