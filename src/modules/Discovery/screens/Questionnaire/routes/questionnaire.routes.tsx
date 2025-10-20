import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TQuestion } from '@/modules/Discovery/@types/TQuestion';
import { useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';
import { type QuestionnaireStackParamList } from '@/modules/Discovery/screens/Questionnaire/routes/questionnaire.types';
import { Question } from '@/modules/Discovery/screens/Questionnaire/screens/Question';

const { Navigator, Screen } = createNativeStackNavigator<QuestionnaireStackParamList>();

type TQuestionnaireStackProps = {
  fromSettings?: boolean;
  questionnaireType?: number;
  from?: string;
  isCreateProfile?: boolean;
};

export function QuestionnaireStack({
  fromSettings = false,
  questionnaireType,
  from,
  isCreateProfile,
}: TQuestionnaireStackProps) {
  const { questionnaire, setQuestionnaireType } = useDiscovery();

  React.useEffect(() => {
    if (questionnaireType) {
      setQuestionnaireType(questionnaireType);
    }
  }, [questionnaireType]);

  return (
    <Navigator
      screenOptions={{
        title: '',
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {questionnaire?.questions.map((question: TQuestion, index) => (
        <Screen
          key={question.id}
          name={`Question_${question.id}`}
          component={Question}
          initialParams={{ fromSettings, from, isCreateProfile }}
        />
      ))}
    </Navigator>
  );
}
