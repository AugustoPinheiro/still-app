import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

type PartsOptionsProps = {
  addOnFolder?: () => void;
};

export function PartsOptions({ addOnFolder }: PartsOptionsProps) {
  const { deleteClothing, selectedClothingsItems } = useCloset();
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
              params: { items: selectedClothingsItems },
            },
          },
        },
      ],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={addOnFolder}>
        <MaterialCommunityIcons name="folder-plus-outline" color="#fff" size={24} />
        <S.BottomSheetText>Adicionar à</S.BottomSheetText>
      </S.BottomSheetButton>

      <S.BottomSheetButton onPress={handleNewLook}>
        <MaterialCommunityIcons name="plus-box-multiple-outline" color="#fff" size={24} />
        <S.BottomSheetText>Criar look</S.BottomSheetText>
      </S.BottomSheetButton>

      <S.BottomSheetButton onPress={deleteClothing}>
        <MaterialCommunityIcons name="trash-can-outline" color="#fff" size={24} />
        <S.BottomSheetText>Excluir peça</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
