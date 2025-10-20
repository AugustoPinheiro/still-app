import React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';

import * as S from './styles';

export function ErrorBoundaryFallback() {
  const navigation = useNavigation();

  return (
    <S.Container>
      <S.Title>OPS!</S.Title>
      <S.Description>Ocorreu um erro inesperado.</S.Description>
      <S.ContainerButton>
        <Button
          onPress={() => {
            navigation?.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'TabRoutes' }] })
            );
          }}
          title="Recarregar"
        />
      </S.ContainerButton>
    </S.Container>
  );
}
