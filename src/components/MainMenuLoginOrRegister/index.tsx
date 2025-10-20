import React from 'react';

import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';
import { getHasRegister, setHasRegister } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import * as S from './styles';

export function MainMenuLoginOrRegister() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { close } = useBottomSheet();
  const hasRegister = getHasRegister();

  const Title = hasRegister ? 'Você ainda não possui cadastro' : 'Você não está logado';
  const text = hasRegister
    ? 'Opa! para aproveitar o melhor da Still, você precisa se cadastrar. Não fique de fora, faça agora o seu cadastro!'
    : 'Opa! para aproveitar o melhor da Still, você precisa fazer login. Não fique de fora, faça agora o seu login!';

  function handleLogin() {
    const routes = {
      index: 0,
      routes: [{ name: 'Login' }],
    };

    close();
    setHasRegister(false);
    navigation?.dispatch(CommonActions.reset(routes));
  }

  function handleRegister() {
    close();

    navigation.navigate('Register');
  }

  return (
    <S.Container>
      <S.TextContainer>
        <S.Title>{Title}</S.Title>
        <S.Text>{text}</S.Text>
      </S.TextContainer>
      <S.ButtonContainer>
        <Button
          title={hasRegister ? 'Quero me cadastrar' : 'Fazer login'}
          onPress={hasRegister ? handleRegister : handleLogin}
          marginBottom={16}
        />
        {hasRegister ? (
          <Button
            title="Já tenho cadastro"
            type="secondary"
            onPress={handleLogin}
            marginBottom={0}
          />
        ) : (
          <></>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}
