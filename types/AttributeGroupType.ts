import { AttributeType } from '@/types/AttributeType';

export type AttributeGroupType = {
  id: number;
  title: string;
  alias: string;
  type: string;
  sort: number;
  active: boolean;
  featured: boolean;
  show: boolean;
  attributes: AttributeType[];
};
