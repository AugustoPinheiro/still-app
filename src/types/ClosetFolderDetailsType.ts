import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';

export type ClosetFolderDetailsType = {
  id?: number;
  title: string;
  owned_by_id: number;
  clothings?: ClosetClothingType[];
  looks?: ClosetLookType[];
  inspirations?: ClosetInspirationType[];
};
