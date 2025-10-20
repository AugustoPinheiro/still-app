import { type AppStackParamList } from '@/routes/app.types';

export type RecoverStackParamList = AppStackParamList & {
  RecoverPass: undefined;
  Code: {
    email: string
  }
  NewPassword: {
    token: string
    email: string
  }
};
