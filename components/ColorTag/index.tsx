import React from 'react';

import * as S from './styles';

type ColorTagProps = {
  color: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ColorTag({ color, selected = false, onPress }: ColorTagProps) {
  return (
    <S.Container selected={selected} onPress={onPress}>
      <S.ColorIcon color={color} />
    </S.Container>
  );
}
