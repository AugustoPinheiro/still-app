import { type TAnswer } from '@/modules/Discovery/@/types/TAnswer';

export type TQuestion = {
  id: number;
  title: string;
  description: string;
  questionnaire_id: number;
  answers: TAnswer[];
};
