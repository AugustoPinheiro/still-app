import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { BackButton } from '@/components/BackButton';
import { ColorTag } from '@/components/ColorTag';
import { Loading } from '@/components/Loading';
import { Tag } from '@/components/Tag';
import { useToast } from '@/contexts/Toast.contexts';
import {
  getClosetAttributeGroups,
  getClosetClothingDetails,
} from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';
import { FlatList, Linking } from 'react-native';
import { Modal } from '@/components/Modal';

type ClothingDetailsProps = GenericPageProp & {
  route: {
    params: {
      item: ClosetClothingType;
    };
  };
};

export function ClothingDetails({ route: { params } }: ClothingDetailsProps) {
  const navigation = useNavigation();
  const { show } = useToast();
  const item = params?.item;

  const [inspiration, setInspiration] = React.useState<any>(null);

  const { data: clothing, isLoading: isLoadingClothing } = useQuery({
    queryKey: ['closetClothingDetails', item?.id],
    queryFn: async () => await getClosetClothingDetails(item?.id),
    enabled: !!item?.id,
  });

  const clothingAttributesIds = clothing?.attributes?.map((item) => item?.clothing_attribute_id);

  const { data: attributes } = useQuery({
    queryKey: ['ClosetNewClothingPartAttributes'],
    queryFn: async () => await getClosetAttributeGroups(),
  });

  if (isLoadingClothing) {
    return <Loading hasBackground={false} />;
  }

  if (!clothing && !isLoadingClothing) {
    show({
      type: 'error',
      message: 'Não foi possível carregar os detalhes da roupa',
    });

    navigation.goBack();
    return <></>;
  }

  function getAttributeIncludes() {
    if (!attributes?.length) return [];

    const attributesFiltered = attributes.filter(
      (attribute) => attribute?.attributes?.length && attribute?.active
    );

    const attributesIncludes = attributesFiltered.filter((attribute) => {
      const filtered = attribute?.attributes?.filter((item) =>
        clothingAttributesIds?.includes(item?.id)
      );

      return filtered;
    });

    return attributesIncludes;
  }

  function renderAttributes() {
    if (!attributes?.length) return <></>;

    const attributesFiltered = getAttributeIncludes();

    return attributesFiltered.map((attribute, index) => {
      const hasAttribute = attribute?.attributes?.filter((item) =>
        clothingAttributesIds?.includes(item?.id)
      );

      if (!hasAttribute) return <></>;

      switch (attribute?.type) {
        case 'color':
          return (
            <S.ContentAtt key={`content_color_${attribute?.id}_${index}`}>
              <S.Label>{attribute?.title}</S.Label>
              <S.ColorContent>
                {attribute?.attributes
                  .filter((item) => clothingAttributesIds?.includes(item?.id))
                  .map((item, indexTag) => {
                    return (
                      <ColorTag
                        key={`colorTag_${item?.id}_${indexTag}`}
                        color={item?.icon}
                        selected={true}
                      />
                    );
                  })}
              </S.ColorContent>
            </S.ContentAtt>
          );
        case 'checkbox':
          return (
            <S.ContentAtt key={`content_checkbox${attribute?.id}_${index}`}>
              <S.Label>{attribute?.title}</S.Label>
              <S.TagContainer>
                {attribute?.attributes
                  .filter((item) => clothingAttributesIds?.includes(item?.id))
                  .map((tag) => (
                    <Tag
                      key={tag?.id}
                      type="tertiary"
                      marginBottom={0}
                      title={tag?.title}
                      // selected={true}
                    />
                  ))}
              </S.TagContainer>
            </S.ContentAtt>
          );
        default:
          return <></>;
      }
    });
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.ImageContainer>
          <S.BackButtonContainer>
            <BackButton onPress={() => navigation.goBack()} />
          </S.BackButtonContainer>
          <S.EditButtonContainer
            onPress={() =>
              // @ts-expect-error
              navigation.navigate('EditClothingPart', { item })
            }
          >
            <S.Icon name="pencil" size={24} />
          </S.EditButtonContainer>
          <S.Image source={item?.image} contentFit="contain" recyclingKey={item?.image} />
        </S.ImageContainer>

        <S.Content>
          <S.TitleTextAttribute>{clothing?.title}</S.TitleTextAttribute>
        </S.Content>

        <S.ContentAtt>
          <S.Label>Categoria</S.Label>
          <S.Value>{clothing?.category?.title}</S.Value>
        </S.ContentAtt>

        <S.ContentRow>{renderAttributes()}</S.ContentRow>

        {clothing?.inspirations?.length ? (
          <S.Section>
            <S.SectionTitle>Inspirações</S.SectionTitle>
            <FlatList
              data={clothing?.inspirations}
              horizontal
              contentContainerStyle={{ gap: 16 }}
              keyExtractor={(item) => item?.inspiration?.image}
              renderItem={({ item }) => (
                <S.SectionButton onPress={() => setInspiration(item?.inspiration)}>
                  <S.SectionImage
                    source={{ uri: item?.inspiration?.image }}
                    recyclingKey={item?.inspiration?.image}
                    cachePolicy="disk"
                  />
                </S.SectionButton>
              )}
            />
          </S.Section>
        ) : (
          <></>
        )}

      {inspiration ? (
        <Modal full onClickOutside={() => setInspiration(null)}>
          <S.SectionClose onPress={() => { setInspiration(null) }}>X</S.SectionClose>
          <S.ModalImage source={{ uri: inspiration?.image }} cachePolicy="disk" />
          {inspiration?.url ? (
            <S.SectionLink
              onPress={async () => {
                await Linking.openURL(inspiration?.url);
              }}
            >
              <S.Icon name="link-variant" />
            </S.SectionLink>
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}

        {/* <S.Content>
          <S.TitleText>Ofertas Recebidas {`(${offers?.length})`}</S.TitleText>

          {offers.map((offer) => (
            <S.Row key={offer.id}>
              <S.Label>{offer.name}</S.Label>
              <S.Value>R$ {offer.value}</S.Value>
              <S.OfferButton>
                <S.OfferButtonText>Ver Oferta</S.OfferButtonText>
                <S.Icon name="chevron-right" size={20} />
              </S.OfferButton>
            </S.Row>
          ))}
        </S.Content> */}
      </S.Container>
    </S.Wrapper>
  );
}
