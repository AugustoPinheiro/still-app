export type UserType = {
  id: number;
  user_id: number;
  username: string;
  profile_type: string;
  profile_id: number;
  active: boolean;
  verified: boolean;
  private: boolean;
  notify_email: boolean;
  notify_push: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  uuid: string;
};
