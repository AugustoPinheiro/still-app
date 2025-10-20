import { ClosetClothingType } from "./ClosetClothingType";

export type ClosetInspirationType = {
  id: number;
  title: string;
  image: string;
  profile_id: number;
  clothings?: {
    clothing: ClosetClothingType
  }[];
};
