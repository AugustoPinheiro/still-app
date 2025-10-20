import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { TextArea } from '@/components/TextArea';
import { useToast } from '@/contexts/Toast.contexts';
import { postRating } from '@/modules/Offers/services/offers.services';
import { getProfileByProfileId } from '@/modules/Social/services/anotherpersonprofile.services';

import * as S from './styles';

const schema = z.object({
  rating: z.number(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function Evaluation() {
  const { params } = useRoute<any>();
  const username = params?.username;
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { show } = useToast();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 3,
      message: '',
    },
  });

  const { data: userData } = useQuery({
    queryKey: ['profileData', username],
    queryFn: async () => await getProfileByProfileId(username),
    enabled: !!username,
  });

  async function handleSubmitForm(data: FormValues) {
    try {
      if (userData?.id === undefined) {
        return;
      }

      if (data?.rating <= 3 && !data?.message) {
        setError('message', {
          message: 'Por favor, deixe um comentário',
        });
        return;
      }

      await postRating(userData.id, data.rating, data?.message);
      show({
        type: 'success',
        message: 'Avaliação enviada com sucesso!',
      });
      navigation.navigate('Success');
    } catch (error: any) {
      const message = error?.message || 'Ocorreu um erro ao enviar a avaliação';

      show({
        type: 'error',
        message,
      });
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FFF' }}
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {isSubmitting && <Loading />}
      <S.Wrapper>
        <S.Container>
          <S.ProfileAvatar source={{ uri: userData?.avatar }} cachePolicy="disk" />
          <S.Text>{`Como foi a sua experiência de compra com ${[
            userData?.name,
            userData?.last_name,
          ].join(' ')}?`}</S.Text>
          <S.RatingContainer>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <Rating
                  size={28}
                  rating={value}
                  touchColor={theme.colors.gold_yellow}
                  fillColor={theme.colors.gold_yellow}
                  baseColor={theme.colors.gold_yellow}
                  scale={1}
                  spacing={21}
                  variant="stars-outline"
                  maxRating={5}
                  onChange={onChange}
                />
              )}
            />
          </S.RatingContainer>
          <S.Section>
            <S.SectionTitle>DEIXE UM COMENTÁRIO</S.SectionTitle>
            <Controller
              control={control}
              name="message"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <TextArea
                  placeholder="Escreva sobre sua experiência..."
                  numberOfLines={5}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />
          </S.Section>
          <S.ButtonContainer>
            <Button title="Enviar" onPress={handleSubmit(handleSubmitForm)} />
          </S.ButtonContainer>
        </S.Container>
      </S.Wrapper>
    </KeyboardAvoidingView>
  );
}
