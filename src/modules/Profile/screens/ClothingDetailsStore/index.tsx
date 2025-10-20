import React from 'react';
import { FlatList, Linking } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { ColorTag } from '@/components/ColorTag';
import { Modal } from '@/components/Modal';
import { Tag } from '@/components/Tag';
import {
  getClosetAttributeGroups,
  getClosetClothingDetails,
} from '@/modules/Closet/services/closet.services';

import * as S from './styles';

export function ClothingDetailsStore() {
  const { params } = useRoute<any>();
  const itemId = params?.id;
  const [inspiration, setInspiration] = React.useState<any>(null);

  const { data: clothing, isLoading: isLoadingClothing } = useQuery({
    queryKey: ['closetClothingDetailsStore', itemId],
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

  return (
    <>
      <S.Container>
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

        <S.Content>
          <S.ImageContainer source={{ uri: clothing?.image }} cachePolicy="disk" />
          <S.Title>{clothing?.title}</S.Title>
          <S.ContentAtt>
            <S.Label>Categoria</S.Label>
            <S.Value>{clothing?.category?.title}</S.Value>
          </S.ContentAtt>

          <S.ContentRow>{renderAttributes()}</S.ContentRow>
        </S.Content>
        {clothing?.link ? (
          <S.ButtonContainer>
            <Button
              title="Comprar na loja"
              onPress={async () => {
                await (clothing?.link && Linking.openURL(clothing?.link));
              }}
            />
          </S.ButtonContainer>
        ) : (
          <></>
        )}
      </S.Container>
      {inspiration ? (
        <Modal full onClickOutside={() => setInspiration(null)}>
          <S.SectionClose>X</S.SectionClose>
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
    </>
  );
}
