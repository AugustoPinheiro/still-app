export type ProfileType = {
  id: number;
  user_id: number;
  username: string;
  profile_id: number;
  profile_type: 'common' | 'professional' | 'store';
  rating: number;
  services?: number;
  notify_push: boolean;
  notify_email: boolean;
  private: boolean;
  closet: boolean;
  favorites: boolean;
  private_closet: boolean;
  private_favorites: boolean;
  name: string;
  last_name: string;
  birth_date: string;
  avatar: string;
  cover: string | null;
  bio: string | null;
  tags: Array<{
    tag: {
      id: number;
      type: string;
      title: string;
      show: boolean;
      created_at: string;
    };
  }>;
  blocked_profiles: [];
  followers: number;
  following: number;
  clothings: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  document_number?: string;
  phone_number?: string;
  styles?: string[];
  followed: boolean;
  uuid: string;
  addresses?: Address[];
};

export type ProfileAnotherUserType = {
  id: number;
  username: string;
  name: string;
  last_name: string;
  birth_date: string;
  avatar: string;
  cover: string;
  bio: string;
  cc_email: string;
  followed: boolean;
  following: number;
  followers: number;
  clothings: number;
  profile_type: 'common' | 'professional' | 'store';
  rating: number;
  services?: number;
  private: boolean;
  private_closet: boolean;
  private_favorites: boolean;
  follow_pending: boolean;
};

interface Meta {
  cursor: number;
  total: number;
  private?: boolean;
}

export interface FollowersListProps {
  meta: Meta;
  result: ProfileType[];
}

export interface InfinityProfileListProps {
  pageParams: Array<number | undefined>;
  pages: FollowersListProps[];
}

export interface Address {
  "id": number, 
  "profile_id": number, 
  "street": string, 
  "street_number": string,
  "complementary": string,
  "city": string, 
  "state": string, 
  "neighborhood": string, 
  "provider_address_id": string, 
  "reference_point": string, 
  "zip_code": string
}