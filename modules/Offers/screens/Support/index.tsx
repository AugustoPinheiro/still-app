import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { TextArea } from '@/components/TextArea';
import { useToast } from '@/contexts/Toast.contexts';
import { postOfferSupport } from '@/modules/Offers/services/offers.services';

import * as S from './styles';

const schema = z.object({
  message: z.string().nonempty('Campo obrigatório'),
});

type FormValues = z.infer<typeof schema>;

export function Support() {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const { show } = useToast();

  const offerId = params?.offerId;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  });

  async function handleSubmitForm(data: FormValues) {
    try {
      await postOfferSupport(offerId, data.message);
      show({ type: 'success', message: 'Mensagem enviada com sucesso' });
      navigation.navigate('Feed');
    } catch (error: any) {
      const message = error?.message || 'Ocorreu um erro ao enviar a mensagem';

      show({ type: 'error', message });
    }
  }

  return (
    <KeyboardAvoidingContainer>
      <S.Container>
        {isSubmitting && <Loading />}
        <S.Content>
          <S.TextContainer>
            <S.Title>RELATE O OCORRIDO</S.Title>
            <S.Description>
              Nós da FINTI nos preocupamos com a sua experiência. Nos diga qual foi o problema que
              houve com o recebimento da sua peça, iremos tentar ajudá-lo.
            </S.Description>
          </S.TextContainer>

          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextArea
                label="Descrição"
                placeholder="Descreva o que aconteceu"
                value={value}
                onChangeText={onChange}
                numberOfLines={5}
                error={errors.message?.message}
              />
            )}
          />
        </S.Content>
        <S.ButtonContainer>
          <Button title="Enviar" disabled={isSubmitting} onPress={handleSubmit(handleSubmitForm)} />
        </S.ButtonContainer>
      </S.Container>
    </KeyboardAvoidingContainer>
  );
}
