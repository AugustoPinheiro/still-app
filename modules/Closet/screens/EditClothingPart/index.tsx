import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { useToast } from '@/contexts/Toast.contexts';
import { useNavigationUtils } from '@/hooks/useNavigationUtils';
import {
  getClosetAttributeGroups,
  getClosetCategories,
  getClosetClothingDetails,
  putClosetClothing,
} from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';
import { TouchableOpacity } from 'react-native';

type AddNewClothingPartProps = GenericPageProp & {
  route: {
    params: {
      image?: Asset;
      item?: ClosetClothingType;
      comesProfile?: boolean;
    };
  };
};

const schema = z.object({
  title: z.string().max(50).trim().min(1, 'O título Não pode ser ficar em branco'),
  category_id: z.number({ description: 'Selecione uma categoria' }),
  attributes: z.array(z.number().optional()).optional(),
  price: z.string().optional(),
  isPublic: z.boolean().optional(),
});

type SchemaFieldsType = keyof z.infer<typeof schema>;
type SchemaType = z.infer<typeof schema>;

export function EditClothingPart({ navigation, route: { params } }: AddNewClothingPartProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<{ key: any; value: any }>();
  const { showTabBar } = useNavigationUtils(navigation);
  const theme = useTheme();
  const { show } = useToast();
  const [activeAccordion, setActiveAccordion] = useState(false);
  // TODO: refetch das pecas ao salvar
  // const {ref} = useCloset();

  const item = params?.item;
  const comesProfile = params?.comesProfile;

  const { data: clothing, isLoading: isLoadingClothing } = useQuery({
    queryKey: ['closetClothingDetails', item?.id],
    queryFn: async () => await getClosetClothingDetails(item?.id),
    enabled: !!item?.id,
  });

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
      title: clothing?.title ?? '',
      category_id: clothing?.category_id ?? undefined,
      attributes: clothing?.attributes?.map((item) => item?.clothing_attribute_id) ?? [],
      price: clothing?.price ? `${ clothing?.price * 100 }` : '0',
      isPublic: !clothing?.private ?? true,
    },
  });

  if (!item) {
    navigation?.goBack();
  }

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['closetCategories'],
    queryFn: async () => await getClosetCategories(),
  });

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
        title: data.title,
        image: item?.image,
        category_id: data.category_id ? Number(data.category_id) : undefined,
        price,
        private: !data.isPublic,
        attributes: attributes?.length ? attributes : undefined,
      };

      await putClosetClothing(item.id, payload);

      show({
        type: 'success',
        message: 'Peça atualizada com sucesso!',
      });

      goToCloset();
    } catch (error: any) {
      const message =
        error?.message ?? 'Ops! não conseguimos editar a peça. Tente novamente mais tarde.';
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

  function renderAttributes() {
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
  }

  useEffect(() => {
    if (clothing) {
      setSelectedCategory({ key: clothing.category.id, value: clothing.category.title });
      setValue('title', clothing.title);
      setValue('price', clothing?.price ? `${clothing.price * 100}` : '0');
      setValue('isPublic', !clothing.private);

      if (clothing.attributes?.length) {
        setValue(
          'attributes',
          clothing.attributes.map((item) => item?.clothing_attribute_id)
        );
      }
    }
  }, [clothing]);

  if (isLoadingClothing) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Wrapper>
      {(isLoadingCategories || isLoadingAttributes) && <Loading />}
      <KeyboardAvoidingContainer>
        <S.Container>
          <S.ImageContainer>
            <S.BackButtonContainer>
              <BackButton
                onPress={() => {
                  if (comesProfile) {
                    navigation.navigate('Profile');
                    return;
                  }

                  navigation.goBack();
                }}
              />
            </S.BackButtonContainer>
            <S.Image
              source={{ uri: item?.image }}
              contentFit="contain"
              recyclingKey={item?.image}
              cachePolicy="disk"
            />
          </S.ImageContainer>

          <S.Content>
            <S.TitleText>{item ? 'Editar Peça' : 'Cadastrar Nova Peça'}</S.TitleText>
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
                />
              )}
            />

            <Controller
              control={control}
              name="category_id"
              render={({ field: { onChange, value } }) => (
                <S.SelectContainer>
                  <S.Label>Categoria</S.Label>
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
                    defaultOption={selectedCategory}
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

            {/* <S.SwitchContainer>
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
            </S.SwitchContainer> */}
          </S.Content>

          <S.ButtonContainer>
            <Button
              title={item ? 'Salvar' : 'Adicionar ao closet'}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading}
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
              {item
                ? 'Estamos atualizando a sua peça. Em alguns segundos ela já estará em seu closet!'
                : 'Estamos digitalizando a sua peça. Em alguns segundos ela já estará em seu closet!'}
            </S.ModalDescription>
          </S.ModalLoadingContainer>
        </Modal>
      )}
    </S.Wrapper>
  );
}
