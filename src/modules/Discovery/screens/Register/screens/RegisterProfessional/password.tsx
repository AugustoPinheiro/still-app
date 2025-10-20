import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { type RegisterStackParamList } from '../../routes/register.types';
import * as S from './styles';

type TPasswordCompanyNavigationProps = NativeStackNavigationProp<
  RegisterStackParamList,
  'RegisterProfessionalPassword'
>;

export function PasswordProfessional() {
  const navigation = useNavigation<TPasswordCompanyNavigationProps>();
  const [, setPassword] = useState('');

  function handleNextStep() {
    navigation.navigate('SuccessRegisterProfessional');
  }

  return (
    <S.Container>
      <S.Title>Senha</S.Title>
      <S.Subtitle>Adicione uma senha segura para que possa acessar a plataforma</S.Subtitle>

      <S.Form>
        <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
        <Input placeholder="Confirmação de senha" secureTextEntry />
      </S.Form>

      <S.ButtonContent>
        <Button title="Próximo" onPress={handleNextStep} />
      </S.ButtonContent>
    </S.Container>
  );
}
