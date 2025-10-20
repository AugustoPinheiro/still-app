import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonActions } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { ColorTag } from '@/components/ColorTag';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Tag } from '@/components/Tag';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { BottomSheetOptions } from '@/modules/Closet/screens/NewLook/components/BottomSheetOptions';
import { BottomSheetPhoto } from '@/modules/Closet/screens/NewLook/components/BottomSheetPhoto';
import {
  getClosetAttributeGroups,
  postClosetNewLook,
} from '@/modules/Closet/services/closet.services';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';
import { ProfileAnotherUserType } from '@/types/ProfileType';

import * as S from './styles';

type Item = { id: string; uri: string };

type NewLookDetailsParams = GenericPageProp & {
  route: {
    params: {
      image: Item;
      items: Item[];
      anotherUser?: string | undefined;
    };
  };
};

type PhotoType = {
  uri: string;
  isSaved?: boolean;
};

const schema = z.object({
  attributes: z.array(z.number()).optional(),
});

type SchemaFieldsType = keyof z.infer<typeof schema>;
type SchemaFieldsValuesType = z.infer<typeof schema>;

export function NewLookDetails({ navigation, route: { params } }: NewLookDetailsParams) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [photo, setPhoto] = React.useState<PhotoType | null>(null);
  const [showModalPhoto, setShowModalPhoto] = React.useState(false);
  const theme = useTheme();
  const { deleteLook } = useCloset();
  const { show } = useToast();
  const { setBottomSheetProps, expand, close } = useBottomSheet();

  const [permissionCameraResponse, requestPermissionCamera] = ImagePicker.useCameraPermissions();

  const image = params?.image;
  const items = params?.items;
  const anotherUser = params?.anotherUser ?? undefined;
  const { userData } = useAnotherProfile();

  const { data: attributes, isLoading: isLoadingAttributes } = useQuery({
    queryKey: ['ClosetNewLookAttributes'],
    queryFn: async () => await getClosetAttributeGroups(),
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      attributes: [],
    },
  });

  function openOptions() {
    setBottomSheetProps({
      id: 'NewLookBottomSheetOptions',
      content: <BottomSheetOptions items={items} onClose={close} />,
      snapPoints: [216],
    });
    expand();
  }

  function goToCloset() {
    if (anotherUser) {
      const routes = {
        index: 0,
        routes: [
          {
            name: 'Feed',
            params: {
              screen: 'AnotherUserProfile',
              params: {
                username: userData?.username,
              },
            },
          },
        ],
      };
      navigation?.dispatch(CommonActions.reset(routes));
    } else {
      const routes = {
        index: 0,
        routes: [{ name: 'Closet' }],
      };

      navigation?.dispatch(CommonActions.reset(routes));
    }
  }

  const onSubmit = async (data: SchemaFieldsValuesType) => {
    try {
      setIsLoading(true);

      const newData: {
        image_url: string;
        photo_url: string | undefined;
        clothings: string[];
        attributes: number[] | undefined;
        anotherUser?: ProfileAnotherUserType | undefined;
      } = {
        image_url: image.uri,
        photo_url: photo?.uri,
        clothings: items.map((item) => item.id),
        attributes: data?.attributes,
        anotherUser: undefined,
      };

      if (anotherUser) {
        newData.anotherUser = userData;
      }

      await postClosetNewLook(newData);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      show({ type: 'error', message: 'Erro ao salvar look' });
    } finally {
      setIsLoading(false);
      // navigation.navigate('Closet');
    }
  };

  async function showImagePicker() {
    close();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.1,
    });

    if (!result?.canceled) {
      setPhoto({ uri: result.assets[0].uri });
      setShowModalPhoto(true);
    }
  }

  async function showCamera() {
    close();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('É necessária permissão para acessar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 0.1 });

    if (!result?.canceled) {
      setPhoto({ uri: result.assets[0].uri });
      setShowModalPhoto(true);
    }
  }

  async function handleTakePicture() {
    if (photo) {
      setShowModalPhoto(true);
      return;
    }

    setBottomSheetProps({
      id: 'NewLookBottomSheetTakePicture',
      content: <BottomSheetPhoto showCamera={showCamera} showGallery={showImagePicker} />,
      snapPoints: [290],
    });
    expand();
  }

  function handleClosePhotoModal() {
    setShowModalPhoto(false);

    if (!photo?.isSaved) {
      setPhoto(null);
    }
  }

  const handleOnChangeArray = (value: string | number, field: SchemaFieldsType) => {
    const values = getValues(field);

    if (!Array.isArray(values)) return;

    if (!values.length) {
      setValue(field, [value]);
      return;
    }

    if (values.includes(value)) {
      const valueFiltered = values.filter((item) => item !== value);
      setValue(field, valueFiltered);
      return;
    }

    setValue(field, [...values, value]);
  };

  function renderAttributes() {
    if (!attributes?.length) return <></>;

    const attributesFiltered = attributes.filter(
      (attribute) =>
        attribute.attributes.length &&
        attribute.active &&
        ['season', 'event'].includes(attribute.alias)
    );

    return attributesFiltered.map((attribute) => {
      switch (attribute.type) {
        case 'color':
          return (
            <S.Section key={`content-${attribute.id}`}>
              <S.TitleText>{attribute.title}</S.TitleText>
              <S.ColorContent>
                {attribute.attributes.map((item) => (
                  <Controller
                    key={item.id}
                    control={control}
                    name="attributes"
                    render={({ field: { value } }) => (
                      <ColorTag
                        color={item.icon}
                        selected={value?.includes(item.id)}
                        onPress={() => handleOnChangeArray(item.id, 'attributes')}
                      />
                    )}
                  />
                ))}
              </S.ColorContent>
            </S.Section>
          );
        case 'checkbox':
          return (
            <S.Section key={`content-${attribute.id}`}>
              <S.TitleText>{attribute.title}</S.TitleText>

              {/* <S.DescriptionText>Estado da peça</S.DescriptionText> */}
              <S.TagContainer>
                {attribute.attributes.map((tag) => (
                  <Controller
                    key={tag.id}
                    control={control}
                    name="attributes"
                    render={({ field: { value, onChange } }) => (
                      <Tag
                        key={tag.id}
                        type="secondary"
                        title={tag.title}
                        outline
                        selected={value?.includes(tag.id)}
                        onPress={() => handleOnChangeArray(tag.id, 'attributes')}
                      />
                    )}
                  />
                ))}
              </S.TagContainer>
            </S.Section>
          );
        default:
          return <></>;
      }
    });
  }

  useEffect(() => {
    requestPermissionCamera();
  }, []);

  if (!permissionCameraResponse) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      {(isLoading || isLoadingAttributes) && <Loading />}
      <S.Container>
        <S.ImageContainer>
          <S.BackButtonContainer>
            <BackButton onPress={() => navigation.goBack()} />
          </S.BackButtonContainer>
          <S.FloatButtonContainer>
            <S.FloatPrimaryButton onPress={handleTakePicture}>
              <MaterialCommunityIcons name="image-outline" size={24} color="#FFF" />
            </S.FloatPrimaryButton>

            <S.FloatSecondaryButton onPress={openOptions}>
              <MaterialCommunityIcons name="dots-horizontal" size={24} color="#1b1d1f" />
            </S.FloatSecondaryButton>
          </S.FloatButtonContainer>
          <S.Image
            source={{ uri: image.uri }}
            cachePolicy="disk"
            recyclingKey={image.uri}
            contentFit="contain"
          />
        </S.ImageContainer>
        <S.Content>
          <S.Section>
            <S.Title>Peças</S.Title>
            <S.PartsContainer>
              <FlatList
                data={items}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                renderItem={({ item }) => (
                  <S.PartImageContainer key={item.id}>
                    <S.Image
                      source={{ uri: item?.image }}
                      recyclingKey={item?.image}
                      contentFit="contain"
                      cachePolicy="disk"
                    />
                  </S.PartImageContainer>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
              />
            </S.PartsContainer>
          </S.Section>

          {renderAttributes()}

          <S.ButtonContainer>
            <Button
              title="Salvar alterações"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading}
            />
            <Button
              title="Excluir look"
              type="secondary"
              onPress={async () => {
                await deleteLook(params?.look?.id, () => {
                  const routes = {
                    index: 0,
                    routes: [{ name: 'Closet' }],
                  };

                  navigation.getParent()?.dispatch(CommonActions.reset(routes));
                });
              }}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
      {showModal && (
        <Modal>
          <S.ModalLoadingContainer>
            <S.ModalTitle>
              {anotherUser
                ? 'Sua sugestão foi enviada para aprovação!'
                : 'Look adicionado ao closet!'}
            </S.ModalTitle>
            <S.ModalDescription>
              {anotherUser
                ? 'Se o look for aprovado, ele vai ser adicionado ao Closet da pessoa.'
                : 'Esse look já está disponível no seu closet.'}
            </S.ModalDescription>

            <S.ModalButtonContainer>
              <Button
                title="OK"
                onPress={() => {
                  goToCloset();
                }}
                marginBottom={0}
              />
            </S.ModalButtonContainer>
          </S.ModalLoadingContainer>
        </Modal>
      )}
      {photo?.uri && showModalPhoto && (
        <Modal full onClickOutside={handleClosePhotoModal}>
          <S.ModalPhotoContainer>
            <S.ModalPhotoCloseButton onPress={handleClosePhotoModal}>
              <MaterialCommunityIcons name="close" size={24} color={theme.colors.white} />
            </S.ModalPhotoCloseButton>

            <S.ModalPhoto source={photo} />

            <S.ModalPhotoBottomButtonContainer>
              <S.FloatSecondaryButton onPress={() => setPhoto(null)}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="#1b1d1f" />
              </S.FloatSecondaryButton>

              {!photo?.isSaved && (
                <S.FloatPrimaryButton
                  onPress={() => {
                    setPhoto({ uri: photo.uri, isSaved: true });
                    setShowModalPhoto(false);
                  }}
                >
                  <MaterialCommunityIcons name="check" size={24} color="#FFF" />
                </S.FloatPrimaryButton>
              )}
            </S.ModalPhotoBottomButtonContainer>
          </S.ModalPhotoContainer>
        </Modal>
      )}
    </S.Wrapper>
  );
}
