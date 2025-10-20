import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { TextArea } from '@/components/TextArea';
import { getProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { postContactUs } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

const schema = z.object({
  subject: z.string().min(5, 'Informe o assunto do contato'),
  email: z.string().email('Informe um e-mail válido'),
  message: z.string().min(5, 'Informe a mensagem'),
  phone_number: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactUs() {
  const { user } = getProfile();
  const { show } = useToast();
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      subject: '',
      email: user?.email ?? '',
      message: '',
      phone_number: user?.phone_number ?? '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await postContactUs(data);

      show({
        type: 'success',
        message: 'Contato enviado com sucesso!',
      });

      navigation.goBack();
    } catch (error: any) {
      const message = error?.message ?? 'Erro ao enviar contato';

      show({
        type: 'error',
        message,
      });
    }
  }

  return (
    <S.Wrapper>
      {isSubmitting && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Container>
          <S.OutContent>
            <S.OutText>
              Tem alguma Reclamação, Dúvida ou Sugestão? Precisa de ajuda? Conta com a Still que
              vamos te ajudar :)
            </S.OutText>
          </S.OutContent>

          <S.Form>
            <Controller
              control={control}
              name="subject"
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label="Assunto do Contato"
                  placeholder="Informe o assunto do contato"
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label="E-mail"
                  placeholder="Informe o e-mail para contato"
                  error={error?.message}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="phone_number"
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <InputMask
                  onChangeText={(_, value) => onChange(value)}
                  mask="TEL"
                  value={value}
                  onBlur={onBlur}
                  label="Telefone (Opcional)"
                  placeholder="Informe o telefone para contato"
                  error={error?.message}
                  autoComplete="tel"
                />
              )}
            />

            <Controller
              control={control}
              name="message"
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextArea
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  label="Mensagem"
                  placeholder="Digite sua mensagem"
                  error={error?.message}
                />
              )}
            />

            <S.ButtonContainer>
              <Button title="Enviar" disabled={isSubmitting} onPress={handleSubmit(onSubmit)} />
            </S.ButtonContainer>
          </S.Form>
        </S.Container>
      </KeyboardAvoidingContainer>
    </S.Wrapper>
  );
}
