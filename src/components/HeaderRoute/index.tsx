import React from 'react';

import * as amplitude from '@amplitude/analytics-react-native';
import { CommonActions } from '@react-navigation/native';
import { type NativeStackHeaderProps } from '@react-navigation/native-stack';

import { BackButton } from '@/components/BackButton';

import * as S from './styles';

type HeaderRouteProps = NativeStackHeaderProps & {
  goBackRoute?: () => void;
};

export function HeaderRoute(props: HeaderRouteProps) {
  const navigation = props?.navigation;

  function handleLogin() {
    const routes = {
      index: 0,
      routes: [{ name: 'TabRoutes' }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  function handleGoBack() {
    if (navigation.canGoBack()) {
      if (props?.goBackRoute) {
        props?.goBackRoute();
        return;
      }
      if (props.options.title === 'SELECIONAR IMAGEM') {
        amplitude.track('Click Close Share My Look');
      }
      navigation.goBack();
    } else {
      handleLogin();
    }
  }

  return (
    <S.Container>
      <BackButton onPress={handleGoBack} />
      <S.Title>{props.options.title}</S.Title>
    </S.Container>
  );
}
