import { ClosetLookType } from '@/types/ClosetLookType';

export type EventLookType = {
  id: number;
  schedule_id: number;
  look_id: number;
  look: ClosetLookType;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};
