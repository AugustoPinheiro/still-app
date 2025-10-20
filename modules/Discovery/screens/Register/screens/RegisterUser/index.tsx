import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input/index';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { getProfile } from '@/config/mmkvStorage';
import { useRegister } from '@/modules/Discovery/screens/Register/contexts/register.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import { type RegisterStackParamList } from '../../routes/register.types';
import * as S from './styles';

type TRegisterCompanyNavigationProps = NativeStackNavigationProp<
  RegisterStackParamList,
  'RegisterUser'
>;

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido').min(1, 'O campo e-mail é obrigatório'),
  cpf: z.string().optional(),
  phone_number: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

export function RegisterUser({ navigation }: GenericPageProp<TRegisterCompanyNavigationProps>) {
  const { setFormData, formData } = useRegister();
  const user = getProfile();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      name: formData.name ?? '',
      email: formData.email ?? user?.user?.email ?? '',
      cpf: formData.cpf ?? '',
      phone_number: formData.phone_number ?? '',
    },
  });

  function handleNextStep(data: FormType) {
    setFormData((prevState) => ({ ...prevState, ...data }));

    if (isCreateProfile) {
      navigation.navigate('RegisterUserPhoto', { isCreateProfile });
      return;
    }

    navigation.navigate('RegisterUserPassword');
  }

  return (
    <S.Container>
      <S.Title>Meus dados</S.Title>
      <S.Subtitle>{'Precisamos de algumas informações\nimportantes sobre você!'}</S.Subtitle>
      <KeyboardAvoidingContainer>
        <S.Form>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                label="Nome *"
                maxLength={50}
                placeholder="Nome"
                marginBottom={16}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                label="E-mail *"
                placeholder="E-mail"
                keyboardType="email-address"
                marginBottom={16}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
                editable={!isCreateProfile && !user?.user?.email}
              />
            )}
          />
          {!isCreateProfile ? (
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <InputMask
                  mask="CPF"
                  label="CPF"
                  placeholder="CPF"
                  keyboardType="numeric"
                  marginBottom={16}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />
          ) : (
            <></>
          )}

          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <InputMask
                mask="TEL"
                label="Telefone"
                placeholder="Telefone"
                keyboardType="numeric"
                marginBottom={16}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
        </S.Form>
        <S.ButtonContent>
          <Button title="Próximo" onPress={handleSubmit(handleNextStep)} disabled={!isValid} />
        </S.ButtonContent>
      </KeyboardAvoidingContainer>
    </S.Container>
  );
}
