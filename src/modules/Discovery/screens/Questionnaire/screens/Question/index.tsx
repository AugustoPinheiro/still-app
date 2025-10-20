import React from 'react';
import { type ScrollView } from 'react-native';

import { type RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { type TAnswer } from '@/modules/Discovery/@types/TAnswer';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { type QuestionnaireStackParamList } from '@/modules/Discovery/screens/Questionnaire/routes/questionnaire.types';

import * as S from './styles';

type TQuestionnaireNavigationProps = NativeStackNavigationProp<
  QuestionnaireStackParamList,
  'Question'
>;

type TQuestionRouteProps = {
  origin: {
    fromSettings?: boolean;
    from?: string;
    isCreateProfile?: boolean;
  };
};

export function Question() {
  const { params } = useRoute<RouteProp<TQuestionRouteProps, 'origin'>>();
  const navigation = useNavigation<TQuestionnaireNavigationProps>();
  const scrollRef = React.useRef<ScrollView>(null);
  const fromSettings = params?.fromSettings ?? false;
  const from = params?.from ?? '';
  const isCreateProfile = params?.isCreateProfile;

  const {
    questionnaire,
    answersQuestions,
    questionIndex,
    setQuestionIndex,
    setAnswerQuestions,
    isAnswerSelected,
  } = useDiscovery();

  const question = questionnaire?.questions[questionIndex];
  const totalQuestions = questionnaire?.questions?.length || 0;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  function handleSelectAnswer(answer: TAnswer) {
    scrollRef?.current?.scrollToEnd();

    setAnswerQuestions({ questionId: question.id, answerId: answer.id });
  }

  function isQuestionAnswered() {
    if (isLastQuestion) return true;

    return answersQuestions?.find((answer) => answer.questionId === question.id);
  }

  function handleGoToNextQuestion() {
    if (isLastQuestion) {
      navigation.navigate('Result', { fromSettings, from, isCreateProfile });
      return;
    }

    const nextQuestionIndex = questionIndex + 1;

    setQuestionIndex(nextQuestionIndex);

    navigation.navigate(`Question_${nextQuestionIndex}`, { fromSettings, from });
  }

  useFocusEffect(() => {
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  });

  function renderTitle() {
    if (question?.title.includes('(')) {
      const questionTitle = `${question?.title.split('(')[0]}?`;
      const questionSubTitle = `${question?.title.slice(
        question?.title.indexOf('('),
        question?.title.indexOf(')')
      )})`;

      return (
        <>
          <S.Title>{questionTitle}</S.Title>
          <S.SubTitle>{questionSubTitle}</S.SubTitle>
        </>
      );
    }

    return <S.Title>{question?.title}</S.Title>;
  }

  return (
    <S.QuestionnaireContainer>
      {renderTitle()}
      <S.ScrollContainer ref={scrollRef}>
        <S.AnswerContainer>
          {question?.answers.map((answer) => (
            <Card
              key={answer?.id}
              image={answer?.image}
              label={answer?.title}
              onPress={() => {
                handleSelectAnswer(answer);
              }}
              selected={isAnswerSelected({ questionId: question.id, answerId: answer.id })}
            />
          ))}
        </S.AnswerContainer>

        <S.ButtonContent>
          <Button
            title="Próximo"
            disabled={!isQuestionAnswered()}
            onPress={handleGoToNextQuestion}
          />
        </S.ButtonContent>
      </S.ScrollContainer>
    </S.QuestionnaireContainer>
  );
}
