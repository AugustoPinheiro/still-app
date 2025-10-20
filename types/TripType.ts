export type TripType = {
  id: number;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  active: boolean;
  private: boolean;
  profile_id: number;
  schedules: number[];
};
