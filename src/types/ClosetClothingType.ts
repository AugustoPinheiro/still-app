import { ClosetLookType } from '@/types/ClosetLookType';

export type ClosetClothingType = {
  id: number;
  title: string;
  image: string;
  category_id: number;
  link: string;
  is_monetized: boolean;
  price: number;
  owned_by_id: number;
  owned_by: {
    id: number;
    username: string;
    avatar: string;
    profile_type: string;
  };
  attributes?: Array<{
    id: number;
    clothing_id: number;
    clothing_attribute_id: number;
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
  private?: boolean;
  category: {
    id: number;
    title: string;
    alias: string;
    type: string;
    banner: string;
    parent_id: number;
  };
  inspirations: Array<{
    inspiration: {
      id: number;
      image: string;
      url: string;
    };
  }>;
  tagged_at: [
    {
      post_id: number;
    },
  ];
};

interface Meta {
  cursor: number;
  total: number;
  private?: boolean;
}

export interface ClosetClothingListsType {
  meta: Meta;
  result: ClosetClothingType[];
}

export interface ClosetLookListsType {
  meta: Meta;
  result: ClosetLookType[];
}

export interface InfiniteQueryDataCloset {
  pageParams: Array<number | undefined>;
  pages: ClosetClothingListsType[];
}

interface Category {
  title: string;
  alias: string;
  type: string;
  banner: string;
  parent_id: number;
}

interface Attribute {
  title: string;
  siblings: string;
  attribute_group_id: number;
  icon: string;
  active: boolean;
  show: boolean;
}

export interface ClosetItemProps {
  title: string;
  category_id: number;
  link: string;
  image: string;
  is_monetized: boolean;
  private: boolean;
  price: number;
  owned_by_id: number;
  id: number;
  category: Category;
  attributes: Attribute[];
}
