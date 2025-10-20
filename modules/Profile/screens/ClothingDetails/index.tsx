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
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

type ClothingDetailsProps = GenericPageProp & {
  route: {
    params: {
      id: number;
    };
  };
};

export function ClothingDetails({ route: { params } }: ClothingDetailsProps) {
  const navigation = useNavigation();
  const { show } = useToast();
  const itemId = params?.id;

  const { data: clothing, isLoading: isLoadingClothing } = useQuery({
    queryKey: ['closetClothingDetails', itemId],
    queryFn: async () => await getClosetClothingDetails(itemId),
    enabled: !!itemId,
  });

  const clothingAttributesIds = React.useMemo(
    () => clothing?.attributes?.map((item) => item?.clothing_attribute_id),
    [clothing]
  );

  const { data: attributes } = useQuery({
    queryKey: ['ClosetNewClothingPartAttributes'],
    queryFn: async () => await getClosetAttributeGroups(),
  });

  const renderAttributes = React.useCallback(() => {
    if (!attributes?.length || isLoadingClothing) return <></>;

    const attributesFiltered = attributes.filter(
      (attribute) => attribute.attributes.length && attribute.active
    );

    return attributesFiltered.map((attribute) => {
      const hasAttribute = attribute.attributes.filter((item) =>
        clothingAttributesIds?.includes(item.id)
      ).length;

      if (!hasAttribute) {
        return <React.Fragment key={`no_attribute_${attribute?.id}`}></React.Fragment>;
      }

      switch (attribute.type) {
        case 'color':
          return (
            <S.ContentAtt key={`content-color-${attribute?.id}`}>
              <S.Label>{attribute.title}</S.Label>
              <S.ColorContent>
                {attribute.attributes
                  .filter((item) => clothingAttributesIds?.includes(item.id))
                  .map((item, index) => (
                    <ColorTag key={`${item?.id}_${index}`} color={item?.icon} selected={true} />
                  ))}
              </S.ColorContent>
            </S.ContentAtt>
          );
        case 'checkbox':
          return (
            <S.ContentAtt key={`content-checkbox-${attribute?.id}`}>
              <S.Label>{attribute.title}</S.Label>
              <S.TagContainer>
                {attribute.attributes
                  .filter((item) => clothingAttributesIds?.includes(item.id))
                  .map((tag, index) => (
                    <Tag
                      key={`tag_${tag?.id}_${index}`}
                      type="tertiary"
                      marginBottom={0}
                      title={tag.title}
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
  }, [attributes, clothingAttributesIds]);

  if (!clothing && !isLoadingClothing) {
    show({
      type: 'error',
      message: 'Não foi possível carregar os detalhes da roupa',
    });

    navigation.goBack();
    return <></>;
  }

  if (isLoadingClothing) {
    return <Loading hasBackground={false} />;
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
              navigation.navigate('Closet', {
                screen: 'EditClothingPart',
                params: { item: clothing, comesProfile: true },
              })
            }
          >
            <S.Icon name="pencil" size={24} />
          </S.EditButtonContainer>
          <S.Image
            source={{ uri: clothing?.image }}
            contentFit="contain"
            recyclingKey={clothing?.image}
            cachePolicy="disk"
          />
        </S.ImageContainer>

        <S.Content>
          <S.TitleTextAttribute>{clothing?.title}</S.TitleTextAttribute>
        </S.Content>

        <S.ContentAtt>
          <S.Label>Categoria</S.Label>
          <S.Value>{clothing?.category?.title}</S.Value>
        </S.ContentAtt>

        <S.ContentRow>{renderAttributes()}</S.ContentRow>

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
