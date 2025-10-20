export type SocialSavedPostFolderDetailsType = {
  id: number;
  title: string;
  profile_id: number;
  is_private: true;
  posts: Array<{
    id: number;
    post_id: number;
    profile_id: number;
    folder_id: number;
    post: {
      id: number;
      description: string;
      profile_id: number;
    };
  }>;
};
