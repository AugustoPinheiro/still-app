import { ClosetClothingType } from '@/types/ClosetClothingType';

export type EventClothingType = {
  id: number;
  schedule_id: number;
  clothing_id: number;
  clothing: ClosetClothingType;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};
