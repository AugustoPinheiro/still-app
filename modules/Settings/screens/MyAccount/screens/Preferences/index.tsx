import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { Tag } from '@/components/Tag';
import { getProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { GenderModal } from '@/modules/Discovery/components/GenderModal';
import { type SettingsStackParamList } from '@/modules/Settings/routes/settings.types';
import { getTags, putTags } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

interface PreferenceNavigationProps
  extends NativeStackNavigationProp<SettingsStackParamList, 'Preferences'> {}

export function Preferences() {
  const { show } = useToast();
  const { setBottomSheetProps, expand } = useBottomSheet();
  const navigation = useNavigation<PreferenceNavigationProps>();
  const [tagsStyles, setTagsStyles] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = getProfile();

  const { data, isLoading } = useQuery({
    queryKey: ['fashionTags'],
    queryFn: async () => await getTags(),
  });

  function isSelected(id: number): boolean {
    return tagsStyles.includes(id);
  }

  const handleSetTagsStyles = useCallback((tagStyle: number) => {
    setTagsStyles((prevState) => {
      if (prevState.includes(tagStyle)) {
        return prevState.filter((tag) => tag !== tagStyle);
      }

      return [...prevState, tagStyle];
    });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setIsSubmitting(true);

      await putTags(tagsStyles);

      setIsSubmitting(false);
      show({
        type: 'success',
        message: 'Preferências salvas com sucesso.',
      });
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível salvar suas preferências, tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [tagsStyles]);

  useEffect(() => {
    if (!user?.tags?.length) return;
    const tagsIds = user.tags.map((tag) => tag?.tag?.id);

    setTagsStyles(tagsIds);
  }, []);

  if (isLoading) return <Loading hasBackground={false} />;

  if (!data && !isLoading) {
    return <></>;
  }

  function handleNavigateToQuestionaire(index: number) {
    // @ts-expect-error
    navigation.navigate('Discovery', {
      screen: 'Questionnaire',
      params: { fromSettings: true, from: 'Settings', questionnaireType: index },
    });
  }

  function openGenderSelectModal() {
    setBottomSheetProps({
      id: 'GenderModal',
      content: (
        <GenderModal
          onSelectFeminine={() => handleNavigateToQuestionaire(1)}
          onSelectMasculine={() => handleNavigateToQuestionaire(2)}
          isSettings
        />
      ),
      snapPoints: [316],
    });
    expand();
  }

  return (
    <S.ContainerDefault>
      {isSubmitting && <Loading />}
      <S.Container>
        <S.HeaderTitle>Minhas preferências</S.HeaderTitle>
        <S.HeaderDescription>Edite os estilos da sua preferência.</S.HeaderDescription>

        <S.TagsContainer>
          {data?.map((tag) => (
            <Tag
              key={tag.id}
              title={tag.title}
              selected={isSelected(tag.id)}
              onPress={() => {
                handleSetTagsStyles(tag.id);
              }}
            />
          ))}
        </S.TagsContainer>

        <S.ButtonSave
          onPress={handleSave}
          disabled={isSubmitting}
          title="Salvar"
          type="secondary"
        />

        <S.StyleTitle>Meu estilo</S.StyleTitle>
        <S.StyleValue>{user?.styles?.join(', ')}</S.StyleValue>

        <S.QuestionnaireButton onPress={openGenderSelectModal}>
          <S.QuestionnaireButtonText>Refazer questionário</S.QuestionnaireButtonText>
          <S.QuestionnaireButtonIcon name="arrow-right" />
        </S.QuestionnaireButton>
      </S.Container>
    </S.ContainerDefault>
  );
}
