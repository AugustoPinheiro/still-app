import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Tag } from '@/components/Tag/index';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { type DiscoveryStackParamList } from '@/modules/Discovery/routes/discovery.types';
import { getTags } from '@/modules/Discovery/services/discovery.services';

import * as S from './styles';
import { setHasRegister } from '@/config/mmkvStorage';

type TFashionStylesNavigationProps = NativeStackNavigationProp<
  DiscoveryStackParamList,
  'FashionStyles'
>;

export function FashionStyles() {
  const { tagsStyles, setTagsStyles } = useDiscovery();
  const [tagsSelected, setTagsSelected] = React.useState<number[]>([]);
  const navigation = useNavigation<TFashionStylesNavigationProps>();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  const { data, isLoading } = useQuery({
    queryKey: ['fashionTags'],
    queryFn: async () => await getTags(),
  });

  useEffect(() => {
    if (!data) return;

    const tagsSelected = data.filter((tag) => tagsStyles.includes(tag.id));
    setTagsSelected(tagsSelected.map((tag) => tag.id));
  }, [data]);

  function handleSetTagsStyles(tagStyle: number) {
    setTagsSelected((prevState) => {
      if (prevState.includes(tagStyle)) {
        return prevState.filter((tag) => tag !== tagStyle);
      }

      return [...prevState, tagStyle];
    });
  }

  function isSelected(id: number): boolean {
    return tagsStyles.includes(id);
  }

  function handleNext() {
    // navigation.navigate('Placeholder', { isCreateProfile });
    
    if (isCreateProfile) {
      navigation.navigate('Register', { isCreateProfile });
      return;
    }

    setHasRegister(true);
    navigation.navigate('Highlight');
  }

  if (isLoading) return <Loading hasBackground={false} />;

  if (!data && !isLoading) {
    handleNext();

    return <></>;
  }

  return (
    <S.Container>
      <S.Title>É maravilhoso ter você aqui!</S.Title>
      <S.Subtitle>
        {
          'Para que a gente mostre conteúdos perfeitos para\nvocê, selecione seus estilos preferidos'
        }
      </S.Subtitle>

      {/* <S.TagDiscoverContainer>
        <Tag title="Quero descobrir meu estilo com a Still" onPress={handleNext} />
      </S.TagDiscoverContainer> */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <S.TagsContainer>
          {data?.map((tag) => (
            <Tag
              key={tag.id}
              title={tag.title}
              selected={isSelected(tag.id)}
              onPress={() => {
                setTagsStyles(tag.id);
                handleSetTagsStyles(tag.id);
              }}
            />
          ))}
        </S.TagsContainer>
      </ScrollView>
      <S.ButtonContent>
        <Button title="Próximo" disabled={!tagsSelected.length} onPress={handleNext} />
      </S.ButtonContent>
    </S.Container>
  );
}
