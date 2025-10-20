import React from 'react';
import { type TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  outline?: boolean;
  selected?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary';
  marginBottom?: number;
};

export function Tag({ title, outline, selected, type = 'primary', marginBottom, ...rest }: Props) {
  return (
    <S.Container marginBottom={marginBottom} {...rest}>
      <S.Tag selected={selected} outline={outline} type={type}>
        <S.TagText selected={selected} outline={outline}>
          {title}
        </S.TagText>
      </S.Tag>
    </S.Container>
  );
}
