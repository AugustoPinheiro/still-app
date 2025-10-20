import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, TouchableOpacity } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Switch } from '@/components/Switch';
import { useToast } from '@/contexts/Toast.contexts';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';
import { useNewPost } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';
import { postSocialPost } from '@/modules/Social/services/social.services';
import { uploadPhoto } from '@/services/uploadFile';

import { SocialStackParamList } from '../../routes/social.types';
import * as S from './styles';

const schema = z.object({
  description: z.string().max(255),
  receiveOffer: z.boolean(),
});

type formType = z.infer<typeof schema>;
export function NewPost() {
  const [postLoading, setPostLoading] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);

  const { isLoading } = useQuery({
    queryKey: ['profilebyUsername'],
    queryFn: getProfileByUsername,
  });
  const navigation = useNavigation<NavigationProp<SocialStackParamList>>();
  const route = useRoute<RouteProp<SocialStackParamList>>();
  const theme = useTheme();
  const { show } = useToast();
  const queryClient = useQueryClient();
  const { selectedClothes, selectedPeople, clearMarks } = useNewPost();

  const image = route.params?.uri ?? '';

  const { control, handleSubmit } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      receiveOffer: true,
    },
  });

  const handleMarkItemNavigate = (type: 'clothing' | 'store' | 'professional' | 'common') => {
    navigation.navigate('NewPostMarkItems', {
      uri: image ?? '',
      type,
    });
  };

  async function onSubmit(data: formType) {
    setPostLoading(true);

    uploadPhoto(image, false, 'posts')
      .then(async (url) => {
        if (!url) {
          throw new Error('Não foi possível publicar imagem');
        }

        await postSocialPost(
          {
            description: data.description,
            image: url,
            clothing: selectedClothes,
            people: selectedPeople,
            accept_offer: data.receiveOffer,
          },
          Platform.OS === 'ios'
        );

        await queryClient.invalidateQueries({ queryKey: ['socialPostsList'] });

        navigation.dispatch(StackActions.popToTop());
      })
      .catch((error) => {
        const message = error?.message ?? 'Não foi possível publicar';
        show({
          type: 'error',
          message,
        });
      })
      .finally(() => {
        setPostLoading(false);
      });
  }

  useEffect(() => {
    if (!image) {
      navigation.goBack();
    }

    return () => {
      clearMarks();
    };
  }, []);

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {postLoading && <Loading />}
      <S.Content>
        <S.ContentRow>
          <TouchableOpacity onPress={() => setShowImage(true)}>
            <S.ImageContent
              source={{ uri: image }}
              cachePolicy="disk"
              contentFit="cover"
              contentPosition="center"
              recycleKey={image}
            />
          </TouchableOpacity>
          <S.WrapperInput>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <S.Input
                    placeholder="Escreva uma legenda"
                    multiline
                    maxLength={255}
                    value={value}
                    onChangeText={onChange}
                    error={!!error}
                  />
                  {error && <S.ErrorText>{error?.message}</S.ErrorText>}
                </>
              )}
            />
          </S.WrapperInput>
        </S.ContentRow>
        <S.ContainerOptions hasMargin borderTop onPress={() => handleMarkItemNavigate('clothing')}>
          <S.ButtonText>Marcar peça</S.ButtonText>
          <S.Icon name="chevron-right" size={theme.fontSizes.SM} />
        </S.ContainerOptions>
        <S.ContainerOptions onPress={() => handleMarkItemNavigate('store')}>
          <S.ButtonText>Marcar loja</S.ButtonText>
          <S.Icon name="chevron-right" size={theme.fontSizes.SM} />
        </S.ContainerOptions>
        <S.ContainerOptions onPress={() => handleMarkItemNavigate('professional')}>
          <S.ButtonText>Marcar personal stylist</S.ButtonText>
          <S.Icon name="chevron-right" size={theme.fontSizes.SM} />
        </S.ContainerOptions>
        <S.ContainerOptions onPress={() => handleMarkItemNavigate('common')}>
          <S.ButtonText>Marcar pessoa</S.ButtonText>
          <S.Icon name="chevron-right" size={theme.fontSizes.SM} />
        </S.ContainerOptions>

        <S.WrapperOffer>
          <S.OfferText>Receber oferta</S.OfferText>
          <S.WrapperSwith>
            <Controller
              control={control}
              name="receiveOffer"
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </S.WrapperSwith>
        </S.WrapperOffer>
        <S.TextSmall>
          Você receberá ofertas em peças desta postagem mesmo que não estejam cadastradas no seu
          closet.
        </S.TextSmall>
      </S.Content>
      <S.WrapperButton>
        <Button title="Publicar" onPress={handleSubmit(onSubmit)} disabled={postLoading} />
      </S.WrapperButton>

      {showImage ? (
        <Modal full closeOnClick onClickOutside={() => setShowImage(false)}>
          <S.ModalImage source={{ uri: image }} contentFit="cover" cachePolicy="disk" />
        </Modal>
      ) : (
        <></>
      )}
    </S.Container>
  );
}
