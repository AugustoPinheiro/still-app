export type SocialSavedPostFolderType = {
  folder_id: number;
  title: string;
  item_count: number;
  private: boolean;
  posts: Array<{
    id: number;
    description: string;
    profile_id: number;
    media: Array<{
      id: number;
      image_url: string;
      video_url: string;
      post_id: number;
      active: boolean;
      created_at: string;
    }>;
  }>;
};
