import { type AppStackParamList } from '@/routes/app.types';

export type MyAccountStackParamList = AppStackParamList & {
  Home: undefined;
  MyData: undefined;
  ChangePassword: undefined;
  Preferences: undefined;
  MyCreditCards: undefined;
  Privacy: undefined;
  BlockedAccounts: undefined;
  CardForm: undefined;
};
