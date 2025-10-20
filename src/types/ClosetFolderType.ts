export type ClosetFolderType = {
  id?: number;
  title: string;
  owned_by_id: number;

  _count: {
    clothings: number;
    looks: number;
    inspirations: number;
  };
};
