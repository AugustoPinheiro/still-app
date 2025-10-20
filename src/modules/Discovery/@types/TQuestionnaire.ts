import { type TQuestion } from '@/modules/Discovery/@/types/TQuestion';

export type TQuestionnaire = {
  id: number;
  title: string;
  description: string;
  questions: TQuestion[];
};
