import { EventClothingType } from '@/types/EventClothingType';
import { EventLookType } from '@/types/EventLookType';

export type ScheduleType = {
  id: number;
  title: string;
  profile_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  private: boolean;
  location: string;
  image?: string;
  mood?: string;
  all_day?: boolean;
  trip_id?: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  looks: EventLookType[];
  clothings: EventClothingType[];
  trip?: number;
};
