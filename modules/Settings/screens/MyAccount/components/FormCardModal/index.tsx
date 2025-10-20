import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input/index';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { getProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';

import * as S from './styles';
import { postProfileCard } from '@/modules/Profile/services/profile.services';

const minYear: number = Number(new Date().getFullYear().toString().slice(2, 3));
const schema = z.object({
  input_number: z.string().min(1, 'O número do cartão é obrigatório'),
  input_holder_name: z.string().min(1, 'O nome é obrigatório'),
  input_exp_date: z.string().min(5, 'Data inválida').max(5),
  input_cvv: z.string().min(1, 'O CVV é obrigatório'),
  input_holder_document: z.string().min(1, 'O documento é obrigatório'),
  input_street: z.string().min(1, 'O endereço é obrigatório'),
  input_street_number: z.string().min(1, 'O número da rua é obrigatório'),
  input_complementary: z.string().min(1, 'O complemento é obrigatório'),
  input_neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  input_zip_code: z.string().min(9, 'O CEP é obrigatório'),
  input_city: z.string().min(1, 'A cidade é obrigatório'),
  input_state: z.string().min(1, 'O estado é obrigatório'),
  input_phone_number: z.string().min(1, 'O telefone é obrigatório'),
});

type FormType = z.infer<typeof schema>;

export function FormCard({ close, refetch }: { close: () => void, refetch: () => void }) {
  const user = getProfile();
  const [isLoading, setIsLoading] = React.useState(false);
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      input_phone_number: user?.phone_number ?? '',
      input_holder_name: user?.name + (user?.last_name ? ' ' + user?.last_name : ''),
      input_holder_document: user?.document_number ?? '',
      input_number: '',
      input_exp_date: '',
      input_cvv: '',
      input_street: user?.addresses?.length ? user.addresses[0].street : '',
      input_street_number: user?.addresses?.length ? user.addresses[0].street_number : '',
      input_complementary: user?.addresses?.length ? user.addresses[0].complementary : '',
      input_neighborhood: user?.addresses?.length ? user.addresses[0].neighborhood : '',
      input_zip_code: user?.addresses?.length ? user.addresses[0].zip_code : '',
      input_city: user?.addresses?.length ? user.addresses[0].city : '',
      input_state: user?.addresses?.length ? user.addresses[0].state : '',
    },
  });

  function checkCep(input: any) {
    const cep = input._dispatchInstances.memoizedProps.value.replace(/\D/g, '');
    if (cep.length == 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data: any) => {
          setValue('input_street', data.logradouro);
          setValue('input_neighborhood', data.bairro);
          setValue('input_city', data.localidade);
          setValue('input_state', data.uf);
        });
    }
  }

  const onSubmit = async (data: FormType) => {
    try {
      setIsLoading(true);
      const expDate = data.input_exp_date.split('/');
      if (Number(expDate[1]) < minYear) {
        show({
          type: 'error',
          message: `O ano de expiração não pode ser inferior a ${minYear}.`,
        });
        setIsLoading(false);
        return;
      }
      const payload = {
        phone_number: data.input_phone_number.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''),
        holder_name: data.input_holder_name,
        holder_document: data.input_holder_document.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''),
        number: data.input_number.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''),
        exp_month: Number(expDate[0]),
        exp_year: Number(expDate[1]),
        cvv: data.input_cvv,
        billing_address: {
          line_1: data.input_street + ',' + data.input_street_number + ',' + data.input_neighborhood,
          line_2: data.input_complementary,
          zip_code: data.input_zip_code.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, ''),
          city: data.input_city,
          state: data.input_state,
          country: 'BR',
        },
      };

      await postProfileCard(payload)
      .then(() => {
        show({
          type: 'success',
          message: 'Cartão adicionado com sucesso!',
        });
      })
      .catch((error) => {
        const message =
        error?.message ?? 'Ocorreu um erro ao cadastrar cartão. Tente novamente mais tarde.';
        console.error(error);

        show({
          type: 'error',
          message,
        });
      });

    } catch (error: any) {
      const message =
        error?.message ?? 'Ocorreu um erro ao cadastrar cartão. Tente novamente mais tarde.';
      console.error(error);

      show({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading hasBackground={true} />
      ) : (
        <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <S.Container>
            <S.Title>Novo cartão</S.Title>
            <KeyboardAvoidingContainer>
              <S.Form>
                <Controller
                  control={control}
                  name="input_number"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputMask
                      mask="credit_card"
                      label="Número do cartão *"
                      placeholder="Número do cartão"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <S.FormRow>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_exp_date"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <InputMask
                          mask="card_exp_date"
                          label="Validade *"
                          placeholder="Validade"
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_cvv"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="CVV *"
                          maxLength={3}
                          placeholder="CVV"
                          keyboardType="numeric"
                          marginBottom={16}
                          autoCapitalize="none"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                </S.FormRow>
                <Controller
                  control={control}
                  name="input_holder_name"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      label="Nome no cartão *"
                      maxLength={50}
                      placeholder="Nome no cartão"
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
                  name="input_holder_document"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputMask
                      mask="CPF"
                      label="CPF *"
                      placeholder="CPF"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="input_phone_number"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputMask
                      mask="TEL"
                      label="Telefone *"
                      placeholder="Telefone"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <S.SubTitle>Endereço de cobrança</S.SubTitle>
                <Controller
                  control={control}
                  name="input_zip_code"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputMask
                      mask="CEP"
                      label="CEP *"
                      placeholder="CEP"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={checkCep}
                      error={error?.message}
                    />
                  )}
                />
                <S.FormRow>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_street"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="Endereço *"
                          maxLength={50}
                          placeholder="Endereço"
                          marginBottom={16}
                          autoCapitalize="none"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_street_number"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="Número *"
                          maxLength={4}
                          placeholder="Número"
                          marginBottom={16}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                </S.FormRow>
                <Controller
                  control={control}
                  name="input_complementary"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      label="Complemento *"
                      maxLength={30}
                      placeholder="Complemento"
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
                  name="input_neighborhood"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      label="Bairro *"
                      maxLength={50}
                      placeholder="Bairro"
                      marginBottom={16}
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
                <S.FormRow>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_city"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="Cidade *"
                          maxLength={50}
                          placeholder="Cidade"
                          marginBottom={16}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                  <S.FormRowItem>
                    <Controller
                      control={control}
                      name="input_state"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="Estado *"
                          maxLength={2}
                          placeholder="Estado"
                          marginBottom={16}
                          autoCapitalize="characters"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                        />
                      )}
                    />
                  </S.FormRowItem>
                </S.FormRow>
              </S.Form>
              <S.ButtonContent>
                <Button title="Salvar" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
                <Button title="Cancelar" type="secondary" onPress={close} />
              </S.ButtonContent>
            </KeyboardAvoidingContainer>
          </S.Container>
        </BottomSheetScrollView>
      )}
    </>
  );
}
