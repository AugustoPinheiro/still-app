import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';

import * as S from './styles';

export function ClothingPartsEmpty() {
  const navigation = useNavigation();

  return (
    <S.ContainerEmpty>
      <S.EmptyTitle>Você ainda não possui nada no seu Closet.</S.EmptyTitle>
      <S.EmptyText>
        Digitalize suas primeiras peças para poder montar seus looks e inspirar outras pessoas.
      </S.EmptyText>
      <S.ButtonContainer>
        <Button
          title="Digitalizar nova peça"
          onPress={() => navigation.navigate('NewClothingPart')}
        />
      </S.ButtonContainer>
    </S.ContainerEmpty>
  );
}
