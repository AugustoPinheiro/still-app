import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

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

export function EvaluationDone() {
  const { params } = useRoute<any>();
  const username = params?.username;
  const theme = useTheme();
  const { show } = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
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
      }

      await postRating(userData.id, data.rating, data?.message);
      navigation.navigate('SuccessDone');
    } catch (error: any) {
      const message = error?.message ?? 'Ocorreu um erro ao enviar sua avaliação';

      show({
        type: 'error',
        message,
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <KeyboardAvoidingView
        style={{ backgroundColor: '#FFF' }}
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {isSubmitting && <Loading />}
        <S.Wrapper>
          <S.Container>
            <S.Title>Avaliação</S.Title>
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
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextArea
                    placeholder="Escreva sobre sua experiência..."
                    numberOfLines={5}
                    value={value}
                    onChangeText={onChange}
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
    </SafeAreaView>
  );
}
