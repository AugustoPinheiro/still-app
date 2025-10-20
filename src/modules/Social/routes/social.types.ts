import { type AppStackParamList } from '@/routes/app.types';
import { ClosetClothingType } from '@/types/ClosetClothingType';

export type SocialStackParamList = AppStackParamList & {
  Social: undefined;
  Notifications: undefined;
  NewLook: undefined;
  AnotherUserProfile: {
    username: string;
    id: string;
  };
  NewPost: {
    uri: string;
  };
  NewPostMarkItems: {
    uri: string;
    type: 'clothing' | 'store' | 'professional' | 'common';
  };
  SocialListClosetByCategory: {
    data: {
      category: string;
      items: ClosetClothingType[];
    };
  };
  ListClosetItemByCategory: {
    item: ClosetClothingType;
  };
};
