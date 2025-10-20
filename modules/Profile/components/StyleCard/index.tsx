import React from 'react';
import { Image } from 'react-native';

import * as amplitude from '@amplitude/analytics-react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components/Button';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { GenderModal } from '@/modules/Discovery/components/GenderModal';

import * as S from './styles';

type Props = {
  onClose: () => void;
};
export function StyleCard({ onClose }: Props) {
  const navigation = useNavigation();
  const { setBottomSheetProps, expand, close } = useBottomSheet();

  function handleNavigateToQuestionaire(index: number) {
    amplitude.track('Click Style Quiz');
    close();
    // @ts-expect-error
    navigation.navigate('Discovery', {
      screen: 'Questionnaire',
      params: { from: 'Profile', questionnaireType: index },
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
    <S.Container>
      <S.TextsContainer>
        <S.TitleRow>
          <S.Title>Análise de estilo</S.Title>
          <S.CloseButton onPress={onClose}>
            <Image
              source={require('../../../../assets/images/close.png')}
              contentFit="contain"
              style={{ width: 12, height: 12 }}
            />
          </S.CloseButton>
        </S.TitleRow>
        <S.Description>
          Responda nosso questionário para conhecer seu estilo predominante.
        </S.Description>
      </S.TextsContainer>

      <Button title="Descobrir meu estilo" marginBottom={0} onPress={openGenderSelectModal} />
    </S.Container>
  );
}
