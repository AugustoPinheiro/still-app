export type SocialPostType = {
  id: number;
  description: string;
  profile_id: number;
  username: string;
  profile_name: string;
  profile_rating?: number;
  avatar: string;
  liked: boolean;
  media: Array<{
    id: number;
    image_url: string;
    video_url: string;
    post_id: number;
    active: boolean;
    created_at: string;
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
  people: [];
  created_at: string;
};
