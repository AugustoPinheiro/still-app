import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TAnswerQuestion } from '@/modules/Discovery/@types/TAnswerQuestion';
import { TQuestionnaire } from '@/modules/Discovery/@types/TQuestionnaire';
import { getQuestionnaire } from '@/modules/Discovery/services/discovery.services';

interface DiscoveryContextData {
  profile: EProfile | null;
  objective: string[];
  tagsStyles: number[];
  questionnaire: TQuestionnaire | null;
  answersQuestions: TAnswerQuestion[];
  questionIndex: number;
  isFetching: boolean;
  setQuestionIndex: (questionIndex: number) => void;
  setProfile: (profile: EProfile) => void;
  setObjective: (objective: string) => void;
  setTagsStyles: (tagsStyles: number) => void;
  setAnswerQuestions: (answerQuestion: TAnswerQuestion) => void;
  isAnswerSelected: (answerQuestion: TAnswerQuestion) => boolean;
  setQuestionnaireType: (questionnaireType: number) => void;
}

interface DiscoveryProviderProps {
  children: React.ReactNode;
}

export enum EProfile {
  PERSONAL = 'PERSONAL',
  PERSONAL_STYLIST = 'PERSONAL_STYLIST',
  STORE = 'STORE',
}

const DiscoveryContext = createContext({} as DiscoveryContextData);

const DiscoveryProvider = ({ children }: DiscoveryProviderProps) => {
  const [profile, setProfile] = useState<EProfile | null>(null);
  const [objective, setObjective] = useState<string[]>([]);
  const [tagsStyles, setTagsStyles] = useState<number[]>([]);
  const [answersQuestions, setAnswersQuestions] = useState<TAnswerQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionnaireType, setQuestionnaireType] = useState<number>(1);

  const fetchQuestionnaire = async () => {
    try {
      const questionnaireData = await getQuestionnaire(questionnaireType);
      return questionnaireData ?? null;
    } catch (error) {
      console.error("Erro ao buscar questionário:", error);
      return null;
    }
  };

  const {
    data: questionnaire = null,
    isFetching,
  } = useQuery({
    queryKey: ['onboardingQuestionnaire', questionnaireType],
    queryFn: fetchQuestionnaire,
  });

  function setAnswerQuestions(answerQuestion: TAnswerQuestion) {
    setAnswersQuestions((prevState) => {
      const prevStateFiltered = prevState?.filter(
        (answer) => answer.questionId !== answerQuestion.questionId
      );

      return [...prevStateFiltered, answerQuestion];
    });
  }

  function isAnswerSelected(answerQuestion: TAnswerQuestion) {
    return answersQuestions?.some(
      (answer) =>
        answer.questionId === answerQuestion.questionId &&
        answer.answerId === answerQuestion.answerId
    );
  }

  function handleSetObjective(objective: string) {
    setObjective((prevState) => {
      if (prevState.includes(objective) && prevState.length === prevState.filter((obj) => obj !== objective).length) {
        return prevState;
      }
      return prevState.includes(objective)
        ? prevState.filter((obj) => obj !== objective)
        : [...prevState, objective];
    });
  }

  function handleSetTagsStyles(tagStyle: number) {
    setTagsStyles((prevState) => {
      if (prevState.includes(tagStyle) && prevState.length === prevState.filter((tag) => tag !== tagStyle).length) {
        return prevState;
      }
      return prevState.includes(tagStyle)
        ? prevState.filter((tag) => tag !== tagStyle)
        : [...prevState, tagStyle];
    });
  }

  return (
    <DiscoveryContext.Provider
      value={{
        profile,
        objective,
        tagsStyles,
        questionnaire,
        answersQuestions,
        questionIndex,
        isFetching,
        setQuestionIndex,
        setProfile,
        setObjective: handleSetObjective,
        setTagsStyles: handleSetTagsStyles,
        setAnswerQuestions,
        isAnswerSelected,
        setQuestionnaireType,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};

function useDiscovery() {
  const context = useContext(DiscoveryContext);

  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }

  return context;
}

export { DiscoveryProvider, useDiscovery };