import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input/index';
import { InputMask } from '@/components/InputMask';

import { type RegisterStackParamList } from '../../routes/register.types';
import * as S from './styles';

type TRegisterProfessionalNavigationProps = NativeStackNavigationProp<
  RegisterStackParamList,
  'RegisterProfessional'
>;

export function RegisterProfessional() {
  const navigation = useNavigation<TRegisterProfessionalNavigationProps>();

  function handleChangeText(text: string) {}

  function handleNextStep() {
    navigation.navigate('RegisterProfessionalPassword');
  }

  return (
    <S.Container>
      <S.Title>Dados da minha empresa</S.Title>
      <S.Subtitle>Precisamos de algumas informações importantes sobre a sua empresa</S.Subtitle>

      <S.Form>
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          marginBottom={16}
          onChangeText={handleChangeText}
          autoCapitalize="none"
        />
        <InputMask
          mask="CNPJ"
          placeholder="CNPJ"
          keyboardType="numeric"
          marginBottom={16}
          onChangeText={handleChangeText}
        />
        <Input placeholder="Razão Social" marginBottom={16} onChangeText={handleChangeText} />
        <Input placeholder="Nome fantasia" onChangeText={handleChangeText} />
      </S.Form>
      <S.ButtonContent>
        <Button title="Próximo" onPress={handleNextStep} />
      </S.ButtonContent>
    </S.Container>
  );
}
