import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/Button';
import { setHasRegister } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { type DiscoveryStackParamList } from '@/modules/Discovery/routes/discovery.types';

import { GenderModal } from '../../components/GenderModal';
import { useDiscovery } from '../../contexts/discovery.contexts';
import * as S from './styles';

import * as amplitude from '@amplitude/analytics-react-native';

type TPlaceholderNavigationProps = NativeStackNavigationProp<
  DiscoveryStackParamList,
  'Placeholder'
>;

export function Placeholder() {
  const navigation = useNavigation<TPlaceholderNavigationProps>();
  const { setBottomSheetProps, expand, close } = useBottomSheet();
  const { setQuestionnaireType } = useDiscovery();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  function handleNavigate() {
    setTimeout(() => {
      close();
      navigation.navigate('Questionnaire', { isCreateProfile });
    }, 500);
  }

  function onSelectFeminine() {
    setQuestionnaireType(1);
    handleNavigate();
  }

  function onSelectMasculine() {
    setQuestionnaireType(2);
    handleNavigate();
  }

  function openGenderSelectModal() {
    setBottomSheetProps({
      id: 'GenderModal',
      content: (
        <GenderModal onSelectFeminine={onSelectFeminine} onSelectMasculine={onSelectMasculine} />
      ),
      snapPoints: [316],
    });
    expand();
  }

  function handleNavigateToHighlight() {
    amplitude.track('Click Answer Quiz Later');
    if (isCreateProfile) {
      navigation.navigate('Register', { isCreateProfile });
      return;
    }

    setHasRegister(true);
    navigation.navigate('Highlight');
  }

  return (
    <S.Container>
      <S.Content>
        <S.Title>{'Descubra\nseu estilo'}</S.Title>

        <S.Text>Responda a seguir o questionário para entendermos melhor qual o seu estilo</S.Text>

        <S.SubText>
          Caso prefira não responder agora, você conseguirá encontrar o questionário no seu perfil e
          responder quando preferir :)
        </S.SubText>
      </S.Content>

      <S.ButtonContent>
        <Button title="Continuar" onPress={openGenderSelectModal} />
        <Button title="Responder depois" type="secondary" onPress={handleNavigateToHighlight} />
      </S.ButtonContent>
    </S.Container>
  );
}
