import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { getClosetFolderById } from '@/modules/Closet/services/closet.services';

import * as S from './styles';

export function FolderDetails() {
  const navigation = useNavigation();
  const { selectedFolder } = useCloset();

  const { data, isLoading } = useQuery({
    queryKey: ['folder', selectedFolder?.id],
    queryFn: async () => await getClosetFolderById(selectedFolder?.id),
  });

  const clothings = data?.clothings;
  const inspirations = data?.inspirations;
  const looks = data?.looks;

  if (
    !isLoading &&
    !selectedFolder &&
    (!clothings?.length || !inspirations?.length || !looks?.length)
  ) {
    return navigation.goBack();
  }

  function handleGoToClothingDetails(item: any) {
    navigation.navigate('ClothingDetails', { item });
  }

  function handleGoToLookDetails(look: any) {
    navigation.navigate('NewLookEdit', { look });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.Content>
          {clothings?.length ? (
            <S.Section>
              <S.SectionTitle>Peças</S.SectionTitle>
              <CardsImage data={clothings} onClickItem={handleGoToClothingDetails} />
            </S.Section>
          ) : (
            <></>
          )}

          {looks?.length ? (
            <S.Section>
              <S.SectionTitle>Looks</S.SectionTitle>
              <CardsImage data={looks} onClickItem={handleGoToLookDetails} />
            </S.Section>
          ) : (
            <></>
          )}

          {inspirations?.length ? (
            <S.Section>
              <S.SectionTitle>Inspirações</S.SectionTitle>
              <CardsImage data={inspirations} hasTitle={false} />
            </S.Section>
          ) : (
            <></>
          )}
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
}
