import React, { useRef } from 'react';
import { Linking } from 'react-native';

import {
  CommonActions,
  type RouteProp,
  useNavigation,
  useRoute,
  TabActions,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { BottomSheet, type BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { setHasRegister } from '@/config/mmkvStorage';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { type QuestionnaireStackParamList } from '@/modules/Discovery/screens/Questionnaire/routes/questionnaire.types';
import {
  postQuestionnaireStyle,
  putQuestionnaireAnswers,
} from '@/modules/Discovery/services/discovery.services';

import * as S from './styles';

type TQuestionnaireNavigationProps = NativeStackNavigationProp<
  QuestionnaireStackParamList,
  'Result'
>;
type TResultRouteProps = {
  origin: {
    fromSettings: boolean;
    from?: string;
    isCreateProfile?: boolean;
  };
};

export function Result() {
  const { params } = useRoute<RouteProp<TResultRouteProps, 'origin'>>();
  const navigation = useNavigation<TQuestionnaireNavigationProps>();
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const fromSettings = params?.fromSettings ?? false;
  const from = params?.from ?? '';
  const { answersQuestions } = useDiscovery();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isCreateProfile = params?.isCreateProfile;

  function handleExpandBottomSheet() {
    if (from) {
      handleGoToBack();
      return;
    }

    bottomSheetRef.current?.expand();
  }

  function getIdsAnswers() {
    return answersQuestions?.map((answer) => answer.answerId);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['questionnaireStyle'],
    queryFn: async () => await postQuestionnaireStyle(getIdsAnswers()),
  });

  async function handleGoToBack() {
    if (from) {
      setIsSubmitting(true);
      const routes = {
        index: 0,
        routes: [{ name: 'TabRoutes' }],
      };

      await putQuestionnaireAnswers(getIdsAnswers(), true);

      navigation.getParent()?.dispatch(CommonActions.reset(routes));
      if (fromSettings) {
        navigation.dispatch(TabActions.jumpTo('Profile'));
        navigation.dispatch(CommonActions.navigate('Settings', { screen: 'Preferences' }));
        return;
      }

      navigation.dispatch(TabActions.jumpTo(from));

      setIsSubmitting(false);
    }

    setHasRegister(true);

    if (isCreateProfile) {
      navigation.navigate('Register', { isCreateProfile });
      return;
    }

    navigation.navigate('Highlight', { isCreateProfile });
  }

  function handleOpenTerms() {
    Linking.openURL('https://www.fintiapp.com.br/termos-e-condicoes-de-uso');
  }

  function handleOpenPrivacy() {
    Linking.openURL('https://www.fintiapp.com.br/politica-de-privacidade');
  }

  if (isLoading || isSubmitting) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.ResultContainer>
      <S.Content>
        <S.Title>{`Seu estilo é\n${data?.join('\n')}`}</S.Title>

        {/* <S.Description>
          Você possui um estilo verdadeiramente elegante. Suas escolhas cuidadosas de roupas e
          acessórios refletem um olhar apurado para a moda, criando looks impecáveis e harmoniosos.
        </S.Description> */}
      </S.Content>

      <S.ButtonContent>
        <Button title="Próximo" onPress={handleExpandBottomSheet} />
      </S.ButtonContent>
      <BottomSheet ref={bottomSheetRef} snapPoints={[310]}>
        <S.BottomSheetContainer>
          <S.BottomSheetTextContainer>
            <S.BottomSheetText>{'Clicando em "Concordar e Continuar"'}</S.BottomSheetText>
            <S.BottomSheetText>você concorda com nossos</S.BottomSheetText>
            <S.ButtonText onPress={handleOpenTerms}>
              <S.BottomSheetTextBold>Termos de </S.BottomSheetTextBold>
              <S.BottomSheetTextBold>Serviço </S.BottomSheetTextBold>
            </S.ButtonText>
            <S.BottomSheetText>e declara que leu nossa </S.BottomSheetText>
            <S.ButtonText onPress={handleOpenPrivacy}>
              <S.BottomSheetTextBold>Política</S.BottomSheetTextBold>
              <S.BottomSheetTextBold> de Privacidade</S.BottomSheetTextBold>
            </S.ButtonText>
          </S.BottomSheetTextContainer>

          <S.ButtonContent>
            <Button title="Concordar e continuar" onPress={handleGoToBack} />
          </S.ButtonContent>
        </S.BottomSheetContainer>
      </BottomSheet>
    </S.ResultContainer>
  );
}
