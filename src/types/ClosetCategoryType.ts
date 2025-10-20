export type ClosetCategoryType = {
  id: number;
  title: string;
  alias: string;
  type?: string;
  banner?: string;
  parent_id?: number;
  children?: ClosetCategoryType[];
};
