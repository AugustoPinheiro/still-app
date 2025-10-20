import React from 'react';
import { type TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  outline?: boolean;
  type?: 'primary' | 'tertiary' | 'success' | 'danger' | 'warning';
  marginBottom?: number;
};

export function Badge({ title, outline, type = 'primary', marginBottom, ...rest }: Props) {
  return (
    <S.Container marginBottom={marginBottom} {...rest}>
      <S.Badge outline={outline} type={type}>
        <S.BadgeText outline={outline}>
          {title}
        </S.BadgeText>
      </S.Badge>
    </S.Container>
  );
}
