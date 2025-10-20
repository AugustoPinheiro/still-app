import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

type CombinationsOptionsProps = {
  addOnFolder?: () => void;
};

export function CombinationsOptions({ addOnFolder }: CombinationsOptionsProps) {
  const { deleteLook } = useCloset();

  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={addOnFolder}>
        <MaterialCommunityIcons name="folder-plus-outline" color="#fff" size={24} />
        <S.BottomSheetText>Adicionar à</S.BottomSheetText>
      </S.BottomSheetButton>

      <S.BottomSheetButton onPress={async () => await deleteLook()}>
        <MaterialCommunityIcons name="trash-can-outline" color="#fff" size={24} />
        <S.BottomSheetText>Excluir look</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
