import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { zodResolver } from '@hookform/resolvers/zod';
import { CommonActions } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Asset } from 'expo-media-library';
import { useTheme } from 'styled-components/native';
import { z } from 'zod';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { ColorTag } from '@/components/ColorTag';
import { Input } from '@/components/Input';
import { InputMask } from '@/components/InputMask';
import { KeyboardAvoidingContainer } from '@/components/KeyboardAvoidingContainer';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Switch } from '@/components/Switch';
import { Tag } from '@/components/Tag';
import { getUserData } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { useNavigationUtils } from '@/hooks/useNavigationUtils';
import {
  GetClosetCategoriesResponse,
  getClosetAttributeGroups,
  getClosetCategories,
  postClosetClothing,
} from '@/modules/Closet/services/closet.services';
import { uploadPhoto } from '@/services/uploadFile';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

type AddNewClothingPartProps = GenericPageProp & {
  route: {
    params: {
      image?: Asset;
    };
  };
};

const schema = z.object({
  title: z.string().max(50).trim().nonempty('O título Não pode ser ficar em branco'),
  category_id: z.number(),
  attributes: z.array(z.number()).optional(),
  price: z.string().optional(),
  isPublic: z.boolean().optional(),
  is_monetized: z.boolean().optional(),
  link: z.string().optional(),
});

type SchemaFieldsType = keyof z.infer<typeof schema>;
type SchemaType = z.infer<typeof schema>;

export function AddNewClothingPart({ navigation, route: { params } }: AddNewClothingPartProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [urlPhoto, setUrlPhoto] = React.useState('');
  const [imageLoading, setImageLoading] = React.useState(true);
  const { showTabBar } = useNavigationUtils(navigation);
  const theme = useTheme();
  const { show } = useToast();
  const userData = getUserData();
  const [activeAccordion, setActiveAccordion] = useState(false);

  const image = params?.image;
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      category_id: undefined,
      attributes: [],
      isPublic: true,
      price: undefined,
      is_monetized: true,
      link: '',
    },
  });

  if (!image) {
    navigation?.goBack();
  }

  function compareCategory(
    current: GetClosetCategoriesResponse,
    next: GetClosetCategoriesResponse
  ) {
    if (!current.value || !next.value) return 0;

    return current.value.localeCompare(next.value);
  }

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['closetCategories'],
    queryFn: async () => await getClosetCategories(),
  });

  categories?.sort(compareCategory);

  const { data: attributes, isLoading: isLoadingAttributes } = useQuery({
    queryKey: ['ClosetNewClothingPartAttributes'],
    queryFn: async () => await getClosetAttributeGroups(),
  });

  function goToCloset() {
    const routes = {
      index: 0,
      routes: [{ name: 'Closet' }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  const onSubmit = async (data: SchemaType) => {
    try {
      setIsLoading(true);

      const attributes = data?.attributes?.map((item) => ({
        id: item,
        main: false,
      }));

      const price = data.price ? Number(data.price) / 100 : undefined;

      const payload = {
        clothing: {
          title: data.title,
          image: urlPhoto ?? '',
          category_id: data.category_id ? Number(data.category_id) : undefined,
          price,
          private: !data.isPublic,
          is_monetized: data.is_monetized,
          link: !data.link ? null : data.link,
        },
        attributes: attributes?.length ? attributes : undefined,
      };

      await postClosetClothing(payload);

      show({
        type: 'success',
        message: 'Peça adicionada com sucesso!',
      });

      goToCloset();
    } catch (error: any) {
      const message =
        error?.message ?? 'Ocorreu um erro ao adicionar a peça. Tente novamente mais tarde.';
      console.error(error);

      show({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
      showTabBar();
      navigation.navigate('Closet');
    }
  };

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

  const renderAttributes = React.useCallback(() => {
    if (!attributes?.length) return <></>;

    const attributesFiltered = attributes.filter(
      (attribute) => attribute.attributes.length && attribute.active
    );

    return attributesFiltered.map((attribute) => {
      switch (attribute.type) {
        case 'color':
          return (
            <S.Content key={`content-${attribute.id}`}>
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
            </S.Content>
          );
        case 'checkbox':
          return (
            <S.Content key={`content-${attribute.id}`}>
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
            </S.Content>
          );
        default:
          return <></>;
      }
    });
  }, [attributes]);

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        if (!image) return;
        const urlPhoto = await uploadPhoto(image);

        if (!urlPhoto) {
          throw new Error('Ocorreu um erro validar imagem. Tente novamente mais tarde.');
        }

        setUrlPhoto(urlPhoto);
      } catch (error: any) {
        show({
          type: 'error',
          message: 'Ocorreu um erro validar imagem. Tente novamente mais tarde.',
        });

        navigation.goBack();
      }
    };

    if (image && !urlPhoto) {
      getImageUrl();
    }
  }, [image]);

  return (
    <S.Wrapper>
      {(isLoadingCategories || isLoadingAttributes) && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Container nestedScrollEnabled={true}>
          <S.ImageContainer>
            <S.BackButtonContainer>
              <BackButton onPress={() => navigation.goBack()} />
            </S.BackButtonContainer>
            {imageLoading ? (
              <S.ImageLoadingContainer>
                <S.ImageLoadingText>Processando imagem...</S.ImageLoadingText>
                <ActivityIndicator color={theme?.colors.gray02} />
              </S.ImageLoadingContainer>
            ) : (
              <></>
            )}
            <S.Image
              source={{ uri: urlPhoto }}
              contentFit="contain"
              onLoad={() => setImageLoading(false)}
              cachePolicy="disk"
            />
          </S.ImageContainer>

          <S.Content>
            <S.TitleText>Cadastrar Nova Peça</S.TitleText>
            <Controller
              control={control}
              name="title"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Título da peça"
                  placeholder="Digite um nome para essa peça"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.title?.message}
                  autoCorrect={false}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="category_id"
              render={({ field: { onChange, value } }) => (
                <S.SelectContainer>
                  <S.TitleWrapper>
                    <S.Label>Categoria</S.Label>
                    <S.RequiredText>*</S.RequiredText>
                  </S.TitleWrapper>
                  <SelectList
                    inputStyles={{
                      color: theme?.colors.gray02,
                      fontFamily: theme?.fonts.REGULAR,
                      fontSize: theme?.fontSizes.XS,
                    }}
                    boxStyles={{
                      borderRadius: 4,
                      borderColor: theme?.colors.gray06,
                      paddingLeft: 12,
                    }}
                    dropdownStyles={{
                      borderColor: theme?.colors.gray06,
                    }}
                    dropdownTextStyles={{ color: theme?.colors.gray02 }}
                    data={categories as any}
                    searchPlaceholder="Pesquisar categoria"
                    placeholder="Selecione uma categoria"
                    setSelected={(selected: any) => onChange(selected)}
                    defaultOption={value}
                  />
                </S.SelectContainer>
              )}
            />
          </S.Content>

          <S.Content>
            <S.Row>
              <S.TitleText>Informações adicionais</S.TitleText>
              <TouchableOpacity onPress={() => setActiveAccordion(!activeAccordion)}>
                <S.Icon name={activeAccordion ? 'chevron-up' : 'chevron-down'} />
              </TouchableOpacity>
            </S.Row>
          </S.Content>
          {activeAccordion && (
            <>{renderAttributes()}</>
          )}

          {userData?.profile_type === 'store' ? (
            <S.Content>
              <Controller
                control={control}
                name="link"
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    label="Link"
                    placeholder="Link para a loja"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.link?.message}
                    autoCorrect={false}
                  />
                )}
              />
            </S.Content>
          ) : (
            <>
              <S.Content>
                {/* <Controller
              control={control}
              name="brand"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  label="Marca (Opcional)"
                  placeholder="Digite o nome da marca"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            /> */}
                <Controller
                  control={control}
                  name="price"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <InputMask
                      mask="currency"
                      keyboardType="numeric"
                      label="Preço (Opcional)"
                      placeholder="Quanto você pagou por essa peça?"
                      value={value}
                      defaultValue=""
                      onBlur={onBlur}
                      onChangeText={(_, value) => onChange(value)}
                    />
                  )}
                />

                <S.ContentAlert>
                  <S.AlertIcon name="alert-circle-outline" />
                  <S.AlertText>O preço é privado. Então, so você o visualizará.</S.AlertText>
                </S.ContentAlert>
              </S.Content>

              <S.Content>
                <S.SwitchContainer>
                  <S.SwitchRow>
                    <S.TitleText>Peça pública</S.TitleText>
                    <Controller
                      control={control}
                      name="isPublic"
                      render={({ field: { value, onChange } }) => (
                        <Switch value={value} onValueChange={onChange} />
                      )}
                    />
                  </S.SwitchRow>
                  <S.SwitchDescription>Esta peça ficará visível no seu perfil.</S.SwitchDescription>
                </S.SwitchContainer>

                <S.SwitchContainer>
                  <S.SwitchRow>
                    <S.TitleText>Peça à venda</S.TitleText>
                    <Controller
                      control={control}
                      name="is_monetized"
                      render={({ field: { value, onChange } }) => (
                        <Switch value={value} onValueChange={onChange} />
                      )}
                    />
                  </S.SwitchRow>
                  <S.SwitchDescription>Esta peça poderá receber ofertas.</S.SwitchDescription>
                </S.SwitchContainer>
              </S.Content>
            </>
          )}

          <S.ButtonContainer>
            <Button
              title="Adicionar ao closet"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading || imageLoading}
            />
            <Button title="Cancelar" type="secondary" onPress={goToCloset} />
          </S.ButtonContainer>
        </S.Container>
      </KeyboardAvoidingContainer>

      {isLoading && (
        <Modal>
          <S.ModalLoadingContainer>
            <S.ModalTitle>Aguarde...</S.ModalTitle>
            <S.ModalDescription>
              Estamos digitalizando a sua peça. Em alguns segundos ela já estará em seu closet!
            </S.ModalDescription>
          </S.ModalLoadingContainer>
        </Modal>
      )}
    </S.Wrapper>
  );
}
