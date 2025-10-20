import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

export function FoldersOptions() {
  const navigation = useNavigation();
  const { removeFolder, selectedFolder, closeBottomSheet } = useCloset();

  function hadleGoToDetails() {
    closeBottomSheet();
    navigation.navigate('FolderDetails', { title: selectedFolder?.title });
  }

  return (
    <S.BottomSheetContainer>
      <S.BottomSheetButton onPress={hadleGoToDetails}>
        <MaterialCommunityIcons name="folder-eye-outline" color="#fff" size={24} />
        <S.BottomSheetText>Ver pasta</S.BottomSheetText>
      </S.BottomSheetButton>

      <S.BottomSheetButton onPress={removeFolder}>
        <MaterialCommunityIcons name="trash-can-outline" color="#fff" size={24} />
        <S.BottomSheetText>Excluir Pasta</S.BottomSheetText>
      </S.BottomSheetButton>
    </S.BottomSheetContainer>
  );
}
