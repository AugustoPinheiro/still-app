import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { InputMask } from '@/components/InputMask';
import { Loading } from '@/components/Loading';
import { Switch } from '@/components/Switch';
import { TextArea } from '@/components/TextArea';
import { getProfile } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { getSocialPostDetails, postSocialOffer } from '@/modules/Social/services/social.services';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

const schema = z.object({
  value: z.string().nonempty('Informe um valor'),
  description: z.string().optional(),
});

type schemaType = z.infer<typeof schema>;

export function Offer() {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { show } = useToast();
  const postParam: SocialFeedType = params?.post;
  const user = getProfile();
  const [selected, setSelected] = React.useState(false);
  const [clothingsSelected, setClothingsSelected] = React.useState<number[]>([]);
  const [post, setPost] = React.useState<SocialFeedType>(postParam);
  const IS_MY_POST = user?.id === post?.profile_id;

  const postId = params?.postId;

  async function fetchPostDetails() {
    try {
      const data = await getSocialPostDetails(postId);

      if (!data) return {} as SocialFeedType;

      setPost(data);

      return data;
    } catch (error: any) {
      const message = error?.message ?? 'Erro ao carregar postagem';

      show({
        type: 'error',
        message,
      });

      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Feed');
      }
    }
  }

  const { isLoading } = useQuery({
    queryKey: ['postDetails', postId],
    queryFn: fetchPostDetails,
    enabled: !!postId,
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      value: '',
      description: '',
    },
  });

  useEffect(() => {
    if (post?.clothing?.length === 0) {
      setSelected(true);
    }
  }, [post]);

  async function handleOnSubmit(data: schemaType) {
    try {
      if (!clothingsSelected.length && !data.description) {
        if (selected && !data.description) {
          setError('description', {
            message: 'Informe qual peça você deseja',
          });

          return;
        }

        if (!clothingsSelected.length || post?.clothing?.length) {
          const message = 'Selecione ao menos uma peça ou\ninforme uma peça não cadastrada';
          show({
            type: 'error',
            message,
          });
          return;
        }

        setError('description', {
          message: 'Informe qual peça você deseja',
        });
        return;
      }

      const value = Number(data.value) ?? 0;

      await postSocialOffer({
        postId: post.id,
        postProfileId: post?.profile_id,
        value,
        description: data?.description ?? '',
        clothings: clothingsSelected,
      });

      show({
        type: 'success',
        message: 'Oferta enviada com sucesso',
      });

      navigation.goBack();
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível enviar a oferta';
      show({
        type: 'error',
        message,
      });
    }
  }

  function handleSelectClothing(clothingId: number) {
    const index = clothingsSelected.indexOf(clothingId);

    if (index > -1) {
      const newClothings = [...clothingsSelected];
      newClothings.splice(index, 1);
      setClothingsSelected(newClothings);
      return;
    }

    setClothingsSelected([...clothingsSelected, clothingId]);
  }

  function isSelectedClothing(clothingId: number) {
    return clothingsSelected.includes(clothingId);
  }

  function handleNavigateUser() {
    if (post?.username === user?.username) {
      navigation.navigate('Profile');
      return;
    }

    navigation.navigate('AnotherUserProfile', {
      username: post?.username,
      id: post.profile_id,
    });
  }

  if (!post || isLoading) {
    return (
      <S.Container>
        <Loading hasBackground={false} />
      </S.Container>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#FFF', flex: 1 }}
      keyboardVerticalOffset={108}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {isSubmitting && <Loading />}
      <S.Wrapper>
        <S.Container>
          <S.PostContainer>
            <S.ImagePost source={{ uri: post?.media[0]?.image_url }} cachePolicy="disk" />
            <S.UserDetailContainer>
              <S.UserDataContainer>
                <TouchableOpacity onPress={handleNavigateUser}>
                  <S.UserPhoto source={{ uri: post?.avatar }} cachePolicy="disk" />
                </TouchableOpacity>

                <View>
                  <TouchableOpacity onPress={handleNavigateUser}>
                    <S.AtNameText>{post?.profile_name}</S.AtNameText>
                  </TouchableOpacity>
                  <S.TimeText>{`@${post?.username}`}</S.TimeText>
                </View>
              </S.UserDataContainer>
              <S.RatingContainer>
                <Rating
                  size={12}
                  rating={post?.profile_rating ?? 0}
                  touchColor={theme.colors.gold_yellow}
                  fillColor={theme.colors.gold_yellow}
                  scale={1}
                  disabled
                />
                <S.RatingText>{post?.profile_rating ? '' : '0'} avaliações</S.RatingText>
              </S.RatingContainer>
            </S.UserDetailContainer>
          </S.PostContainer>
          {post?.clothing?.length ? (
            <S.Section>
              <S.SectionTitle>ESCOLHER PEÇA</S.SectionTitle>

              <FlatList
                data={post.clothing}
                keyExtractor={(item) => String(item.clothing_id)}
                renderItem={({ item }) => (
                  <S.PartsContainer
                    disabled={IS_MY_POST}
                    onPress={() => handleSelectClothing(item.clothing_id)}
                  >
                    <S.PartsImage source={{ uri: item.clothing.image }} cachePolicy="disk" />
                    {isSelectedClothing(item.clothing_id) ? (
                      <S.PartsOverlay>
                        <MaterialCommunityIcons name="check" size={48} color="#FFF" />
                      </S.PartsOverlay>
                    ) : (
                      <></>
                    )}
                  </S.PartsContainer>
                )}
                contentContainerStyle={{ gap: 12 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </S.Section>
          ) : (
            <></>
          )}
          {!IS_MY_POST && (
            <>
              <S.Section>
                <S.SwitchContainer>
                  <S.SwitchRow>
                    <S.SwitchText>Peça não cadastrada</S.SwitchText>
                    <Switch value={selected} onValueChange={setSelected} />
                  </S.SwitchRow>
                  {selected ? (
                    <>
                      <S.SwitchDescription>
                        Informe qual peça você está interessado
                      </S.SwitchDescription>
                      <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
                          <TextArea
                            id="input-not-registered-piece"
                            label="Peça"
                            numberOfLines={2}
                            placeholder="Digite qual peça você deseja"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.description?.message}
                          />
                        )}
                      />
                    </>
                  ) : (
                    <S.SwitchDescription>
                      Informe qual peça você está interessado
                    </S.SwitchDescription>
                  )}
                </S.SwitchContainer>
              </S.Section>
              <S.Section>
                <S.SectionTitle>VALOR</S.SectionTitle>
                <Controller
                  control={control}
                  name="value"
                  render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
                    <InputMask
                      mask="currency"
                      id="input-value"
                      label="Valor"
                      placeholder="Digite um valor"
                      value={value}
                      onChangeText={(_, value) => onChange(value)}
                      onBlur={onBlur}
                      keyboardType="numeric"
                      error={errors.value?.message}
                    />
                  )}
                />
              </S.Section>

              <S.Section>
                <Button
                  title="Enviar oferta"
                  onPress={handleSubmit(handleOnSubmit)}
                  disabled={isSubmitting}
                />
              </S.Section>
            </>
          )}
        </S.Container>
      </S.Wrapper>
    </KeyboardAvoidingView>
  );
}
