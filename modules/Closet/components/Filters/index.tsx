import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { ColorTag } from '@/components/ColorTag';
import { Loading } from '@/components/Loading';
import MultipleSelectList from '@/components/MultipleSelectList';
import { Tag } from '@/components/Tag';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import {
  getClosetAttributeGroups,
  getClosetCategories,
} from '@/modules/Closet/services/closet.services';

import * as S from './styles';

const schema = z.object({
  attributes: z.array(z.number()).optional(),
});

type SchemaFieldsType = z.infer<typeof schema>;
type SchemaKeysType = keyof z.infer<typeof schema>;

export function Filters() {
  const { closeBottomSheet, setFiltersClothing, setFiltersLook, currentTab } = useCloset();
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const theme = useTheme();

  const { control, handleSubmit, getValues, setValue, reset } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      attributes: [],
    },
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['closetCategories'],
    queryFn: async () => await getClosetCategories(),
  });

  const { data: attributes, isLoading: isLoadingAttributes } = useQuery({
    queryKey: ['ClosetNewClothingPartAttributes'],
    queryFn: async () => await getClosetAttributeGroups(),
  });

  const attributesFiltered = attributes?.filter(
    (attribute) => attribute.attributes.length && attribute.active
  );

  const onSubmit = async (data: SchemaFieldsType) => {
    if (currentTab === 'clothing') {
      setFiltersClothing({ categories: selectedCategories, attributes: data?.attributes });
    }
    if (currentTab === 'look') {
      setFiltersLook({ categories: selectedCategories, attributes: data?.attributes });
    }

    closeBottomSheet();
  };

  const onReset = () => {
    reset();
    if (currentTab === 'clothing') {
      setFiltersClothing(undefined);
    }
    if (currentTab === 'look') {
      setFiltersLook(undefined);
    }
  };

  const handleOnChangeArray = (value: string | number, field: SchemaKeysType) => {
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
    return attributesFiltered?.map((attribute) => {
      switch (attribute.type) {
        case 'color':
          return (
            <S.ContentAttributes key={`content-${attribute.id}`}>
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
            </S.ContentAttributes>
          );
        case 'checkbox':
          return (
            <S.ContentAttributes key={`content-${attribute.id}`}>
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
            </S.ContentAttributes>
          );
        default:
          return <></>;
      }
    });
  }

  return (
    <S.Container>
      <S.Header>
        <S.CloseButton onPress={() => closeBottomSheet()}>
          <MaterialCommunityIcons name="close" color="#8A8A99" size={24} />
        </S.CloseButton>
        <S.Title>FILTROS</S.Title>
      </S.Header>
      {isLoadingCategories || isLoadingAttributes ? (
        <S.ContainerLoading>
          <Loading hasBackground={false} />
        </S.ContainerLoading>
      ) : (
        <KeyboardAvoidingView
          style={{ flexGrow: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <S.ScrollContainer>
            {attributesFiltered?.length ? (
              <>
                <S.Content>
                  {categories?.length ? (
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <MultipleSelectList
                          isBottomSheet
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
                          dropdownStyles={{ borderColor: theme?.colors.gray06 }}
                          dropdownTextStyles={{ color: theme?.colors.gray02 }}
                          data={categories as any}
                          label="Categorias"
                          searchPlaceholder="Pesquisar categoria"
                          placeholder="Selecione uma categoria"
                          setSelected={setSelectedCategories}
                          maxHeight={250}
                          notFoundText="Nenhuma categoria encontrada"
                        />
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </S.Content>

                {renderAttributes()}
                <S.Content>
                  <S.ButtonContainer>
                    <Button title="Aplicar" onPress={handleSubmit(onSubmit)} />
                    <Button title="Limpar filtros" type="secondary" onPress={onReset} />
                  </S.ButtonContainer>
                </S.Content>
              </>
            ) : (
              <></>
            )}
          </S.ScrollContainer>
        </KeyboardAvoidingView>
      )}
    </S.Container>
  );
}
