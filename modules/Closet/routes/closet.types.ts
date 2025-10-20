import { AppStackParamList } from '@/routes/app.types';
import { ClosetClothingType } from '@/types/ClosetClothingType';

export type ClosetStackParamList = AppStackParamList & {
  ClosetHome: undefined;
  NewClothingPart: undefined;
  ClothingDetails: {
    item: ClosetClothingType;
  };
  AllSuggestions: {
    from?: string;
  };
};
