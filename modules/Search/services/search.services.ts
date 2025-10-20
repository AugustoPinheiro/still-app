import { api } from '@/config/api';
import { ClosetClothingType } from '@/types/ClosetClothingType';

export type GetSearchClothingsResponse = {
  result: ClosetClothingType[];
  meta: {
    total: number;
    cursor: number;
  };
};

export async function getSearchClothings(
  search?: string,
  filters?: { categories?: number[]; attributes?: number[] },
  cursor?: number
) {
  let params;

  if (search) {
    params = {
      title: search,
    };
  }

  if (filters?.categories?.length) {
    params = {
      ...params,
      categories: filters?.categories.join(','),
    };
  }

  if (filters?.attributes?.length) {
    params = {
      ...params,
      attributes: filters?.attributes.join(','),
    };
  }

  const { data } = await api.get<GetSearchClothingsResponse>(`/closet/clothing/`, {
    params: {
      ...params,
      is_tagged_on_post: true,
      cursor,
      limit: 10,
    },
  });

  return data;
}
