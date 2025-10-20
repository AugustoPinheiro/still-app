import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input/index';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { getProfile } from '@/config/mmkvStorage';
import { useRegister } from '@/modules/Discovery/screens/Register/contexts/register.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email().min(1, 'O campo e-mail é obrigatório'),
  cnpj: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

export function RegisterCompany({ navigation }: GenericPageProp) {
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
      cnpj: formData.cnpj ?? '',
    },
  });

  function handleNextStep(data: FormType) {
    setFormData((prevState) => ({ ...prevState, ...data }));

    if (isCreateProfile) {
      navigation.navigate('RegisterCompanyPhoto', { isCreateProfile });
      return;
    }

    navigation.navigate('RegisterCompanyPassword');
  }

  return (
    <S.Container>
      <S.Title>Dados da minha empresa</S.Title>
      <S.Subtitle>{'Precisamos de algumas informações importantes sobre a sua empresa'}</S.Subtitle>
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

          <Controller
            control={control}
            name="cnpj"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <InputMask
                mask="CNPJ"
                label="CNPJ"
                placeholder="CNPJ"
                keyboardType="numeric"
                marginBottom={16}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />

          {/* <Controller
            control={control}
            name="phone"
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
          /> */}
        </S.Form>
        <S.ButtonContent>
          <Button title="Próximo" onPress={handleSubmit(handleNextStep)} disabled={!isValid} />
        </S.ButtonContent>
      </KeyboardAvoidingContainer>
    </S.Container>
  );
}
