export type AppStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: { isCreateProfile?: boolean };
  Discovery: undefined;
  TabRoutes: undefined;
  RecoverPass: undefined;
  Camera: {
    onTakePhoto: (photo: string) => void;
    position: 'front' | 'back';
  };
};
