import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import { passwordReset } from '../../services/recoverpass.services';
import * as S from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';

const schema = z.object({
  email: z.string().email().nonempty(),
});

type SchemaFieldsType = z.infer<typeof schema>;

type RecoverRouteProp = {
  origin: {
    email?: string;
  };
};

export function RecoverPass({ navigation }: GenericPageProp) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const { show } = useToast();

  const { params } = useRoute<RouteProp<RecoverRouteProp, 'origin'>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      email: params?.email ?? '',
    },
  });

  const email = watch('email', params?.email ?? '');

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [email]);

  async function handleLogin(data: SchemaFieldsType) {
    try {
      setIsLoading(true);
      await passwordReset(data);
      navigation.navigate('Code', { email: data.email });
      setIsLoading(false);
    } catch (error: any) {
      const message = error?.message ?? 'Erro ao enviar código de acesso';

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
            <View>
              <S.Title>ESQUECI MINHA SENHA</S.Title>
              <S.Label>
                Por favor, digite um email já cadastrado na plataforma para enviarmos um código de
                acesso.
              </S.Label>
            </View>
            <S.InputContainer>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    hasError={!!error}
                    autoComplete="email"
                  />
                )}
              />

              {error && <S.ErrorText>{error}</S.ErrorText>}
            </S.InputContainer>
            <S.ButtonContent>
              <Button
                title="Enviar código de acesso"
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
