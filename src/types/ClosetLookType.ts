import { ClosetClothingType } from '@/types/ClosetClothingType';

export type ClosetLookType = {
  id: number;
  title: string;
  image: string;
  favorite: boolean;
  private: boolean;
  approved: boolean;
  attributes: Array<{
    id: number;
    look_id: number;
    attribute_id: number;
    main: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    clothing_attribute: {
      id: number;
      title: string;
      siblings: string;
      icon: string;
      active: boolean;
      show: boolean;
      attribute_group_id: number;
    };
  }>;
  items: Array<{
    id: number;
    owned_by_id: number;
    look_id: number;
    clothing_id: number;
    clothing: ClosetClothingType;
  }>;
  owned_by_id: number;
  made_by_id: number;
  photo: string;
  created_at?: string;
  made_by: {
    username: string;
    common_profile: {
      avatar: string;
    } | null;
    professional_profile: {
      avatar: string;
    } | null
  } | null
};
