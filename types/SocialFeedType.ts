export type SocialFeedType = {
  id: number;
  description: string;
  profile_id: number;
  username: string;
  profile_name: string;
  avatar: string;
  liked: boolean;
  accept_offer: boolean;
  comments?: number;
  media: Array<{
    id: number;
    image_url: string;
    video_url: string;
    post_id: number;
    active: boolean;
  }>;
  tags: [];
  clothing: Array<{
    clothing_id: number;
    pos_x: number;
    pos_y: number;
    clothing: {
      title: string;
      image: string;
      link?: string;
      is_monetized: boolean;
      price: number;
    };
  }>;
  people: Array<{
    profile_id: number;
    pos_x: number;
    pos_y: number;
    profile: {
      username: string;
    };
  }>;
  created_at: string;
};
