import React from 'react';
import { ActivityIndicator, type ButtonProps } from 'react-native';

import * as S from './styles';

type TButtonProps = ButtonProps & {
  title: React.ReactNode;
  onPress?: () => void;
  marginBottom?: number;
  type?: 'primary' | 'secondary';
  weight?: 'default' | 'flat';
  width?: number;
  loading?: boolean;
};

export function Button({
  title,
  onPress,
  marginBottom,
  width,
  type = 'primary',
  weight = 'default',
  loading,
  ...rest
}: TButtonProps) {
  return (
    <S.Container
      type={type}
      weight={weight}
      onPress={onPress}
      marginBottom={marginBottom}
      width={width}
      {...rest}
    >
      <S.ButtonText type={type} weight={weight} disabled={rest?.disabled}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : title}
      </S.ButtonText>
    </S.Container>
  );
}
