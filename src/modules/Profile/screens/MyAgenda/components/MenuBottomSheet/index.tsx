import React from 'react';

import * as S from './styles';

interface Props {
  onPressAddLook: () => void;
  onPressCreateEvent?: () => void;
}

export function MenuBottomSheet({ onPressAddLook, onPressCreateEvent }: Props) {
  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={onPressAddLook}>
        <S.BottomSheetText>ADICIONAR LOOK AO DIA</S.BottomSheetText>
      </S.BottomSheetButton>
      <S.BottomSheetButton onPress={onPressCreateEvent}>
        <S.BottomSheetText>CRIAR UM NOVO EVENTO</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
