import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { CommonActions, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import { passwordResetSave } from '../../services/recoverpass.services';
import * as S from './styles';

const schema = z
  .object({
    password: z.string().min(6, 'Senha é obrigatória'),
    confirm_password: z.string().min(6, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
type SchemaFieldsType = z.infer<typeof schema>;

export function NewPassword({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const route = useRoute<any>();

  const { show } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      confirm_password: '',
      password: '',
    },
  });

  const confirmPassword = watch('confirm_password');
  const password = watch('password');

  useEffect(() => {
    if (error) {
      setError('');
    }
    if (confirmPassword && password && confirmPassword !== password) {
      setError('As senhas digitadas não coincidem');
    } else if (confirmPassword && password && confirmPassword === password) {
      setError('');
    }
  }, [confirmPassword, password]);

  async function handleLogin(data: SchemaFieldsType) {
    try {
      setIsLoading(true);
      await passwordResetSave({
        email: route?.params?.email,
        token: route?.params?.token?.token,
        password: data.password,
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Login',
            },
          ],
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const message = error?.message ?? 'Erro ao tentar redefinir a senha';

      show({
        message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <StatusBar style="auto" backgroundColor="#FCF6F1" />
      {isLoading && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Wrapper hasHeader={false}>
          <S.Container>
            <S.InputContainer>
              <View>
                <S.Title>REDIFINIR SENHA</S.Title>
                <S.Label>
                  Adicione uma nova senha segura para que possa acessar a plataforma.
                </S.Label>
              </View>
              <View style={{ marginTop: 40 }} />
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputPassword
                    label="Senha"
                    placeholder="Digite sua senha"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    hasError={!!error}
                  />
                )}
              />
              <View style={{ marginTop: 16 }} />
              <Controller
                name="confirm_password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputPassword
                    label="Confirmação de senha"
                    placeholder="Digite sua nova senha novamente"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    hasError={!!error}
                  />
                )}
              />
              {error && <S.ErrorText>{error}</S.ErrorText>}
            </S.InputContainer>
            <S.ButtonContent>
              <Button
                title="Salvar alteração"
                marginBottom={0}
                onPress={handleSubmit(handleLogin)}
                disabled={!isValid || isLoading}
              />
            </S.ButtonContent>
          </S.Container>
        </S.Wrapper>
      </KeyboardAvoidingContainer>
    </>
  );
}
