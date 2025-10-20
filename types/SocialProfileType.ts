export type SocialProfileType = {
  id: number;
  user_id: number;
  username: string;
  profile_type: string;
  active: boolean;
  verified: boolean;
  private: boolean;
  notify_email: boolean;
  notify_push: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: {
    email: string;
  };
  common_profile: {
    name: string;
    last_name: string;
    avatar: string;
    tags: Array<{
      id: number;
      tag_id: number;
      profile_common_id: number;
      profile_professional_id: number | null;
      profile_store_id: number | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      tag: {
        id: number;
        type: string;
        title: string;
        show: boolean;
        created_at: string;
        updated_at: string | null;
        deleted_at: string | null;
      };
    }>;
  };
  professional_profile: {
    name: string;
    last_name: string;
    avatar: string;
    tags: Array<{
      id: number;
      tag_id: number;
      profile_common_id: number;
      profile_professional_id: number | null;
      profile_store_id: number | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      tag: {
        id: number;
        type: string;
        title: string;
        show: boolean;
        created_at: string;
        updated_at: string | null;
        deleted_at: string | null;
      };
    }>;
  };
  store_profile: {
    name: string;
    last_name: string;
    avatar: string;
    tags: Array<{
      id: number;
      tag_id: number;
      profile_common_id: number;
      profile_professional_id: number | null;
      profile_store_id: number | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      tag: {
        id: number;
        type: string;
        title: string;
        show: boolean;
        created_at: string;
        updated_at: string | null;
        deleted_at: string | null;
      };
    }>;
  };
};
