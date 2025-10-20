import React, { useEffect } from 'react';

import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { BackButton } from '@/components/BackButton';
import { Loading } from '@/components/Loading';
import { ProgressBar } from '@/components/ProgressBar';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { QuestionnaireStack } from '@/modules/Discovery/screens/Questionnaire/routes/questionnaire.routes';
import { type QuestionnaireStackParamList } from '@/modules/Discovery/screens/Questionnaire/routes/questionnaire.types';

import * as S from './styles';

import * as amplitude from '@amplitude/analytics-react-native';

type TQuestionnaireStackNavigationProps = NativeStackNavigationProp<
  QuestionnaireStackParamList,
  'Discovery'
>;

type TQuestionWrapperRouteProps = {
  origin: {
    fromSettings?: boolean;
    questionnaireType?: number;
    from?: string;
    isCreateProfile?: boolean;
  };
};

export function QuestionWrapper() {
  const { params } = useRoute<RouteProp<TQuestionWrapperRouteProps, 'origin'>>();
  const navigation = useNavigation<TQuestionnaireStackNavigationProps>();
  const { questionnaire, questionIndex, setQuestionIndex, isFetching, setQuestionnaireType } =
    useDiscovery();
  const totalQuestions = questionnaire?.questions?.length || 0;
  const fromSettings = params?.fromSettings ?? false;
  const questionnaireType = params?.questionnaireType;
  const from = params?.from ?? '';
  const isCreateProfile = params?.isCreateProfile;

  function getProgress() {
    return ((questionIndex + 1) * 100) / totalQuestions;
  }

  useEffect(() => {
    if (isFetching) return;

    if (!questionnaire || !totalQuestions) {
      navigation.popToTop();

      navigation.getParent()?.navigate('TabRoutes');
    }
  }, [isFetching, questionnaire, totalQuestions, navigation]);

  function handleBack() {
    amplitude.track('Click Close Style Quiz');
    if (questionIndex === 0) {
      setQuestionIndex(0);

      navigation.goBack();
      return;
    }

    const prevQuestionIndex = questionIndex - 1;

    setQuestionIndex(prevQuestionIndex);

    navigation.navigate(`Question_${questionIndex}`, { fromSettings, from, isCreateProfile });
  }

  useEffect(() => {
    if (questionnaireType) {
      setQuestionnaireType(questionnaireType);
    }
  }, [questionnaireType]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.BackButtonWrapper>
        <BackButton onPress={handleBack} />
      </S.BackButtonWrapper>
      <ProgressBar progress={getProgress()} />
      <S.CounterText>{`pergunta ${questionIndex + 1} de ${totalQuestions}`}</S.CounterText>

      {questionnaire?.questions?.length ? (
        <QuestionnaireStack
          fromSettings={fromSettings}
          from={from}
          questionnaireType={questionnaireType}
          isCreateProfile={isCreateProfile}
        />
      ) : (
        <></>
      )}
    </S.Container>
  );
}
