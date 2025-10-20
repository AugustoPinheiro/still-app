import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePickerAsset } from 'expo-image-picker';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { Photo } from '@/components/Photo';
import { getProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { updateProfile } from '@/modules/Settings/services/settings.services';

import * as S from './styles';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';

const schema = z.object({
  avatar: z.string().optional(),
  username: z.string().min(1, 'Username é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  cc_email: z.string().optional(),
  phone_number: z.string().optional(),
  document_number: z.string().optional(),
});

type FormDataType = z.infer<typeof schema>;

export function MyData() {
  const [isLoading, setIsLoading] = React.useState(false);
  const {refetchUser} = useProfile();
  const dataUser = getProfile();
  const { show } = useToast();
  const name = [dataUser?.name, dataUser?.last_name].join(' ');
  const [image, setImage] = React.useState<ImagePickerAsset>();
  const [enableSubmit, setEnableSubmit] = React.useState(false);

  const { control, handleSubmit, watch } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: dataUser?.avatar ?? '',
      username: dataUser?.username ?? '',
      name: name ?? '',
      cc_email: dataUser?.user?.email ?? '',
      document_number: dataUser?.document_number ?? '',
      phone_number: dataUser?.phone_number ?? '',
    },
  });

  const watchedUserName = watch('username');
  const watchedName = watch('name');
  const watchedDocument = watch('document_number');
  const watchedPhone = watch('phone_number');

  React.useEffect(() => {
    if(watchedUserName !== dataUser?.username) {
      setEnableSubmit(true);
      return;
    }

    if (watchedName !== name) {
      setEnableSubmit(true);
      return;
    }

    if (
      (dataUser?.document_number && watchedDocument !== dataUser?.document_number) ||
      (!dataUser?.document_number && watchedDocument)
    ) {
      setEnableSubmit(true);
      return;
    }

    if (
      (dataUser?.phone_number && watchedPhone !== dataUser?.phone_number) ||
      (!dataUser?.phone_number && watchedPhone)
    ) {
      setEnableSubmit(true);
      return;
    }

    if (image?.uri && image?.uri !== dataUser?.avatar) {
      setEnableSubmit(true);
      return;
    }

    setEnableSubmit(false);
  }, [watchedUserName, watchedName, watchedDocument, watchedPhone, image, dataUser?.avatar, name, dataUser?.document_number]);

  async function onSubmit(data: FormDataType) {
    try {
      setIsLoading(true);

      await updateProfile(data, image);

      show({
        type: 'success',
        message: 'Dados atualizados com sucesso',
      });
    } catch (error) {
      show({
        type: 'error',
        message: 'Erro ao atualizar dados',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.DefaultContainer>
      {isLoading && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Container>
          <Photo onPickImage={setImage} photo={image?.uri ?? dataUser?.avatar} />

          <S.Form>
          <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  label="Username (@)"
                  placeholder="Digite seu @"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  marginBottom={0}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  marginBottom={0}
                />
              )}
            />

            <Controller
              control={control}
              name="cc_email"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  label="E-Mail"
                  placeholder="Digite seu e-mail"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  hasError={!!error}
                  error={error?.message}
                  autoCapitalize="none"
                  marginBottom={0}
                  editable={false}
                />
              )}
            />

            <Controller
              control={control}
              name="document_number"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <InputMask
                  label={dataUser?.profile_type === 'common' ? 'CPF' : 'CNPJ'}
                  mask={dataUser?.profile_type === 'common' ? 'CPF' : 'CNPJ'}
                  placeholder={
                    dataUser?.profile_type === 'common' ? 'Digite seu CPF' : 'Digite seu CNPJ'
                  }
                  value={value}
                  onChangeText={(_, text) => onChange(text)}
                  onBlur={onBlur}
                  error={error?.message}
                  marginBottom={0}
                  editable={!dataUser?.document_number}
                />
              )}
            />
            <Controller
              control={control}
              name="phone_number"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <InputMask
                  label="Telefone"
                  mask="TEL"
                  placeholder="Digite seu telefone"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  marginBottom={0}
                />
              )}
            />
          </S.Form>
          <Button
            title="Salvar"
            onPress={handleSubmit(onSubmit)}
            disabled={!enableSubmit || isLoading || !dataUser?.avatar}
          />
        </S.Container>
      </KeyboardAvoidingContainer>
    </S.DefaultContainer>
  );
}
