import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CardProps = TouchableOpacityProps & {
  image: string;
  label: string;
  selected?: boolean;
};

const logo = require('@/assets/images/logo_2.png');

export function Card({ image, label, selected, ...rest }: CardProps) {
  return (
    <S.CardContainer {...rest} selected={selected}>
      {image ? (
        <S.Image
          source={{ uri: image }}
          recyclingKey={image}
          contentFit="cover"
          placeholder={logo}
          cachePolicy="none"
        />
      ) : (
        <S.Image
          source={logo}
          recyclingKey="@/assets/images/logo_2.png"
          contentFit="center"
          cachePolicy="none"
        />
      )}

      <S.LabelContainer>
        <S.Label selected={selected}>{label}</S.Label>
      </S.LabelContainer>
    </S.CardContainer>
  );
}
