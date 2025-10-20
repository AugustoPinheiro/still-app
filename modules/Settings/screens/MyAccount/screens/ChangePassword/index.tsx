import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { InputPassword } from '@/components/InputPassword';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { changePassword } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Nova senha e confirmação de senha devem ser iguais',
    path: ['confirmPassword'],
  });

export function ChangePassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<ChangePasswordFormData>({
    mode: 'onBlur',
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    try {
      setIsLoading(true);
      await changePassword(data?.currentPassword, data?.newPassword);
      show({
        message: 'Senha alterada com sucesso.',
        type: 'success',
      });
      reset();
    } catch (error: any) {
      const status = error?.status;

      if (status === 403) {
        setError('currentPassword', { message: 'Senha atual inválida.' });
        return;
      }

      show({
        message: 'Erro ao alterar a senha, tente novamente mais tarde!',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.DefaultContainer>
      {isLoading && <Loading />}
      <S.Text>
        Você está prestes a mudar sua senha.{`\n\n`}Sua nova senha precisa possuir ao menos 6
        dígitos.
      </S.Text>
      <KeyboardAvoidingContainer>
        <S.Container>
          <S.InputContainer>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputPassword
                  label="Senha atual"
                  placeholder="Digite sua senha atual"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.currentPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputPassword
                  label="Nova senha"
                  placeholder="Digite a nova senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.newPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputPassword
                  label="Confirme a nova senha"
                  placeholder="Confirme a sua nova senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </S.InputContainer>

          <S.ButtonContent>
            <Button disabled={!isValid} onPress={handleSubmit(onSubmit)} title="Salvar" />
          </S.ButtonContent>
        </S.Container>
      </KeyboardAvoidingContainer>
    </S.DefaultContainer>
  );
}
