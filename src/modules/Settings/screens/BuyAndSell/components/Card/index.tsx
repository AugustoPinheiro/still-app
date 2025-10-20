import React from 'react';

import * as S from './styles';

type CardProps = {
  item: {
    text: string;
    value: string;
    status: string;
  };
};

export function Card({ item }: CardProps) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.TextPrimary>{item.text}</S.TextPrimary>
        <S.TextPrimary>{item.value}</S.TextPrimary>
      </S.CardHeader>
      <S.CardStatus>
        <S.TextSecondary>{item.status}</S.TextSecondary>
      </S.CardStatus>
    </S.Card>
  );
}
