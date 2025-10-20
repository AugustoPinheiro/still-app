import React from 'react';

import * as amplitude from '@amplitude/analytics-react-native';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import * as S from './styles';

export function MainMenuModal() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { close } = useBottomSheet();

  function handleNewClothingPart() {
    amplitude.track('Click Add Clothing');
    const routes = {
      index: 0,
      routes: [
        {
          name: 'Closet',
          params: { screenTo: 'NewClothingPart' },
        },
      ],
    };

    close();

    navigation?.dispatch(CommonActions.reset(routes));
  }

  function handleNewLook() {
    amplitude.track('Click Add Look');
    const routes = {
      index: 0,
      routes: [{ name: 'Closet', params: { screenTo: 'NewLook' } }],
    };

    close();

    navigation?.dispatch(CommonActions.reset(routes));
  }

  function handlePostLook() {
    amplitude.track('Click Post My Look');
    const routes = {
      index: 0,
      routes: [{ name: 'Feed', params: { screenTo: 'NewLook' } }],
    };

    close();

    navigation?.dispatch(CommonActions.reset(routes));
  }

  return (
    <S.Container>
      <S.Button onPress={handleNewClothingPart}>
        <S.ButtonTitle>Digitalizar nova peça</S.ButtonTitle>
      </S.Button>

      <S.Divider />

      <S.Button onPress={handleNewLook}>
        <S.ButtonTitle>Criar nova combinação</S.ButtonTitle>
      </S.Button>

      <S.Divider />

      <S.Button onPress={handlePostLook}>
        <S.ButtonTitle>Postar meu look</S.ButtonTitle>
      </S.Button>

      <S.Divider />

      <S.Button onPress={close}>
        <S.ButtonTitle>Cancelar</S.ButtonTitle>
      </S.Button>
    </S.Container>
  );
}
