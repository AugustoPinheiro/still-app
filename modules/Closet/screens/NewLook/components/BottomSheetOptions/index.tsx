import React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

interface BottomSheetOptionsProps {
  onClose: () => void;
  items: ClosetClothingType[];
}

export function BottomSheetOptions({ onClose, items }: BottomSheetOptionsProps) {
  const { close } = useBottomSheet();
  const navigation = useNavigation();

  function handleNewLook() {
    const routes = {
      index: 0,
      routes: [
        {
          name: 'Closet',
          params: {
            screenTo: 'NewLook',
            params: {
              screen: 'NewLookHome',
              params: { items },
            },
          },
        },
      ],
    };
    close();
    navigation?.dispatch(CommonActions.reset(routes));
  }

  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={handleNewLook}>
        <S.BottomSheetText>FAZER UMA CÓPIA</S.BottomSheetText>
      </S.BottomSheetButton>
      {/* <S.BottomSheetButton onPress={() => {}}>
        <S.BottomSheetText>ATRELAR A UM EVENTO</S.BottomSheetText>
      </S.BottomSheetButton> */}
      {/* <S.BottomSheetButton onPress={() => {}}>
        <S.BottomSheetText>COMPARTILHAR LOOK</S.BottomSheetText>
      </S.BottomSheetButton> */}
      <S.BottomSheetButton onPress={onClose}>
        <S.BottomSheetText>CANCELAR</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
