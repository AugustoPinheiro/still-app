import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

type InspirationsOptionsProps = {
  addOnFolder?: () => void;
};

export function InspirationsOptions({ addOnFolder }: InspirationsOptionsProps) {
  const { deleteInspiration } = useCloset();

  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={addOnFolder}>
        <MaterialCommunityIcons name="folder-plus-outline" color="#fff" size={24} />
        <S.BottomSheetText>Adicionar à</S.BottomSheetText>
      </S.BottomSheetButton>

      <S.BottomSheetButton onPress={deleteInspiration}>
        <MaterialCommunityIcons name="trash-can-outline" color="#fff" size={24} />
        <S.BottomSheetText>Excluir inspiração</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
