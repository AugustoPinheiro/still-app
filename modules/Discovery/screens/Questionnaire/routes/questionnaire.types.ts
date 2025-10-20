import { type DiscoveryStackParamList } from '@/modules/Discovery/routes/discovery.types';

export type QuestionnaireStackParamList = DiscoveryStackParamList &
  Record<
    string,
    { fromSettings?: boolean; questionnaireType?: number; from?: string; isCreateProfile?: boolean }
  >;
