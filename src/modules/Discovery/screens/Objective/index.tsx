import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Tag } from '@/components/Tag';
import { EProfile, useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { ResponseTags, getTags } from '@/modules/Discovery/services/discovery.services';

import { type DiscoveryStackParamList } from '../../routes/discovery.types';
import * as S from './styles';

type TObjectiveNavigationProps = NativeStackNavigationProp<DiscoveryStackParamList, 'Objective'>;

export function Objective() {
  const { tagsStyles, setTagsStyles, profile } = useDiscovery();
  const navigation = useNavigation<TObjectiveNavigationProps>();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  const { data, isLoading } = useQuery({
    queryKey: ['objetiveTags'],
    queryFn: async () => await getTags('goal'),
  });

  function isSelected(id: number): boolean {
    return tagsStyles.includes(id);
  }

  function handleNext() {
    if (profile === EProfile.PERSONAL) {
      return navigation.navigate('FashionStyles', { isCreateProfile });
    }

    // @ts-expect-error
    return navigation.navigate('Register', { screen: 'RegisterCompanyUsername', isCreateProfile });
  }

  const renderItem = (tag: ResponseTags) => (
    <Tag
      key={tag.id}
      title={tag.title}
      selected={isSelected(tag.id)}
      onPress={() => setTagsStyles(tag.id)}
    />
  );

  if (isLoading) return <Loading hasBackground={false} />;

  if (!data && !isLoading) {
    handleNext();

    return <></>;
  }

  return (
    <S.Container hasHeader={false}>
      <S.Title>{'Olá! Como a Still\npode te ajudar?'}</S.Title>
      <S.Subtitle>Selecione abaixo seus objetivos principais</S.Subtitle>

      <S.TagContainer>
        <FlashList
          extraData={tagsStyles}
          data={data}
          renderItem={({ item }) => renderItem(item)}
          estimatedItemSize={29}
        />
      </S.TagContainer>

      <S.ButtonContent>
        <Button title="Próximo" disabled={!tagsStyles.length} onPress={handleNext} />
      </S.ButtonContent>
    </S.Container>
  );
}
