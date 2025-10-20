import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { useRegister } from '@/modules/Discovery/screens/Register/contexts/register.contexts';

import { type RegisterStackParamList } from '../../routes/register.types';
import * as S from './styles';

type TPasswordCompanyNavigationProps = NativeStackNavigationProp<
  RegisterStackParamList,
  'RegisterUserPassword'
>;

const schema = z
  .object({
    password: z
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .nonempty('A senha é obrigatória'),
    confirmPassword: z.string().nonempty('A confirmação de senha é obrigatória'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      });
    }
  });

type FormType = z.infer<typeof schema>;

export function PasswordUser() {
  const navigation = useNavigation<TPasswordCompanyNavigationProps>();
  const { setFormData, formData } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      password: formData.password ?? '',
      confirmPassword: '',
    },
  });

  function handleNextStep(data: FormType) {
    setFormData((prevState) => ({ ...prevState, password: data.password }));

    navigation.navigate('RegisterUserPhoto');
  }

  return (
    <S.Container>
      <S.Title>Senha</S.Title>
      <S.Subtitle>Adicione uma senha segura para que possa acessar a plataforma</S.Subtitle>
      <KeyboardAvoidingContainer>
        <S.Form>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <InputPassword
                label="Senha"
                placeholder="Escolha uma senha"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <InputPassword
                label="Confirmação de senha"
                placeholder="Confirme a senha"
                onChangeText={onChange}
                value={value}
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
