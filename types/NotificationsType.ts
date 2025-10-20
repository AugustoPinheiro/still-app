export type notificationsType = {
  text: string;
  profile_id: number;
  image: string;
  related_profiles: string[];
  type: 'like';
  object_id: number;
  id: number;
  seen: boolean;
};
