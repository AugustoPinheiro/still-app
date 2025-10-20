import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import Logo from '@/assets/images/logo1.svg';
import OnboardingImg from '@/assets/images/onboarding.svg';
import { Button } from '@/components/Button';
import { type DiscoveryStackParamList } from '@/modules/Discovery/routes/discovery.types';

import * as S from './styles';

type TOnboardingNavigationProps = NativeStackNavigationProp<DiscoveryStackParamList, 'Onboarding'>;

export function Onboarding() {
  const navigation = useNavigation<TOnboardingNavigationProps>();

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  function handleNavigateToDiscovery() {
    navigation.navigate('ChooseProfile');
  }

  return (
    <S.Container>
      <Logo />

      <OnboardingImg />

      <S.ButtonContent>
        <Button title="Conhecer o app" onPress={handleNavigateToDiscovery} />
        <Button title="Acessar conta" type="secondary" onPress={handleNavigateToLogin} />
      </S.ButtonContent>
    </S.Container>
  );
}
