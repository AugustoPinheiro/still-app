import { type AppStackParamList } from '@/routes/app.types';
import { SocialFeedType } from '@/types/SocialFeedType';

export type DiscoveryStackParamList = AppStackParamList & {
  Onboarding: undefined;
  ChooseProfile: { isCreateProfile?: boolean };
  Objective: { isCreateProfile?: boolean };
  FashionStyles: { isCreateProfile?: boolean };
  Placeholder: { isCreateProfile?: boolean };
  Questionnaire: { fromSettings?: boolean; questionnaireType?: number; isCreateProfile?: boolean };
  Result: { fromSettings?: boolean; isCreateProfile?: boolean; from?: string };
  Highlight: { isCreateProfile?: boolean };
  PostDiscoveryDetails: { post: SocialFeedType };
};
