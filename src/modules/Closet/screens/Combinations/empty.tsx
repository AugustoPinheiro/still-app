import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';

import * as S from './styles';

export function CombinationsEmpty() {
  const navigation = useNavigation();

  return (
    <S.ContainerEmpty>
      <S.EmptyTitle>Você ainda não fez nenhuma combinação.</S.EmptyTitle>
      <S.EmptyText>Crie looks surpreendentes ao combinar suas peças de roupas!</S.EmptyText>

      <S.ButtonContainer>
        <Button title="Criar nova combinação" onPress={() => navigation.navigate('NewLook')} />
      </S.ButtonContainer>
    </S.ContainerEmpty>
  );
}
