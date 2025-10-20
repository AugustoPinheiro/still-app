import uuid from 'react-native-uuid';

import { format } from 'date-fns';
import { ImagePickerAsset } from 'expo-image-picker';

import { api } from '@/config/api';
import { getUserData, setInspirationsUpload } from '@/config/mmkvStorage';
import { uploadPhoto } from '@/services/uploadFile';
import { AttributeGroupType } from '@/types/AttributeGroupType';
import { ClosetCategoryType } from '@/types/ClosetCategoryType';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetFolderDetailsType } from '@/types/ClosetFolderDetailsType';
import { ClosetFolderType } from '@/types/ClosetFolderType';
import { ClosetInspirationType } from '@/types/ClosetInspirationType';
import { ClosetLookType } from '@/types/ClosetLookType';
import { ProfileAnotherUserType } from '@/types/ProfileType';

export type ResponseClosetFolder = {
  id: number;
  title: string;
  owned_by_id: number;
};

export type GetClosetCategoriesResponse = {
  key: string;
  value: string;
};

type GetClosetClothingsResponse = {
  result: ClosetClothingType[];
  meta: {
    total: number;
    cursor: number;
  };
};

type GetClosetInspirationsResponse = {
  result: ClosetInspirationType[];
  meta: {
    total: number;
    cursor: number;
  };
};

type addToClosetFolderProps = {
  folderId: number;
  looks?: number[];
  clothings?: number[];
  inspirations?: number[];
};

type PostClosetClothingProps = {
  clothing: {
    title: string;
    image: string;
    category_id?: number;
    link?: string;
    is_monetized?: boolean;
    price: number;
    private?: boolean;
  };
  attributes?: number[];
};

type PostClosetNewLookProps = {
  title?: string;
  image?: string;
  clothings: number[];
  favorite?: boolean;
  private?: boolean;
  approved?: boolean;
  attributes?: number[];
  photo_url?: string;
  image_url?: string;
  isNewPhoto?: boolean;
  anotherUser?: ProfileAnotherUserType;
};

type GetClosetLooksResponse = {
  result: ClosetLookType[];
  meta: {
    total: number;
    cursor: number;
  };
};

export async function saveClosetFolder(
  folderName: string
): Promise<ResponseClosetFolder | undefined> {
  try {
    const user = getUserData();

    if (!user?.username) {
      throw new Error('Profile not found');
    }

    const payload = {
      title: folderName,
      profile_id: user.id,
    };

    const { data } = await api.post<ResponseClosetFolder>('/closet/folders', payload);

    return data;
  } catch (error) {
    console.error('saveClosetFolder', error);
  }
}

export async function addToClosetFolder({
  folderId,
  inspirations = [],
  clothings = [],
  looks = [],
}: addToClosetFolderProps) {
  if (!looks?.length && !clothings?.length && !inspirations?.length) {
    throw new Error('Looks, clothing or inspirations must be provided');
  }

  const payload = {
    folder_id: folderId,
    looks,
    clothings,
    inspirations,
  };

  await api.put('/closet/add-to-folder', payload);
}

export async function getClosetClothings(
  search?: string,
  filters?: { categories?: number[]; attributes?: number[] },
  cursor?: number,
  limit?: number
) {
  const user = getUserData();
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

  const { data } = await api.get<GetClosetClothingsResponse>(
    `/closet/clothing/user/${user?.username}`,
    {
      params: {
        ...params,
        cursor,
        limit: 12,
      },
      // paramsSerializer: (params) => parseParams(params),
    }
  );

  return data;
}

export async function getClosetClothingsAll(cursor?: number) {
  const user = getUserData();

  const { data } = await api.get<GetClosetClothingsResponse>(
    `/closet/clothing/user/${user?.username}`,
    {
      params: {
        cursor,
        limit: 1000,
      },
    }
  );

  return data;
}

export async function deleteClosetClothing(clothingsId: number[]) {
  for (const id of clothingsId) {
    await api.delete(`/closet/clothing/${id}`);
  }
}

export async function deleteClosetInspiration(clothingsId: number[]) {
  for (const id of clothingsId) {
    await api.delete(`/closet/inspiration/${id}`);
  }
}

export async function deleteClosetLook(LooksId: number[]) {
  for (const id of LooksId) {
    await api.delete(`/closet/looks/${id}`);
  }
}

export async function postClosetClothing(clothing: PostClosetClothingProps) {
  const user = getUserData();
  const payload = {
    clothing: {
      ...clothing?.clothing,
      owned_by_id: user?.id,
    },
    attributes: clothing?.attributes,
  };

  await api.post('/closet/clothing', payload);
}

export async function putClosetClothing(clothingId: number, clothing: PostClosetClothingProps) {
  const user = getUserData();

  const payload = {
    ...clothing,
    attributes: clothing?.attributes,
    owned_by_id: user?.id,
  };

  await api.put(`/closet/clothing/id/${clothingId}`, payload);
}

export async function getClosetAttributeGroups() {
  const { data } = await api.get<AttributeGroupType[]>('/closet/attribute-groups');

  return data;
}

export async function getClosetProfile() {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<{
    total_clothings: number;
    total_looks: number;
    utilization: number;
  }>(`/closet/stats/${user.username}`);
  return data;
}

export async function getClosetCategories(): Promise<GetClosetCategoriesResponse[] | undefined> {
  try {
    const { data } = await api.get<ClosetCategoryType[]>('/closet/categories');

    if (!data) {
      throw new Error('Closet categories not found');
    }

    const childrens = [];
    const categoriesParsed = [] as GetClosetCategoriesResponse[];

    for (const category of data) {
      if (category?.children) {
        childrens.push(...category?.children);
      }
    }

    for (const category of childrens) {
      categoriesParsed.push({ key: category?.id, value: category?.title });
    }

    return categoriesParsed;
  } catch (error) {
    console.error('getClosetCategories', error);
  }
}

export async function getClosetFolders(search?: string) {
  try {
    const user = getUserData();

    if (!user?.username) {
      throw new Error('Profile not found');
    }

    const params = {
      title: search,
    };

    if (!search) {
      delete params.title;
    }

    const { data } = await api.get<ClosetFolderType[]>(`/closet/folders/${user?.username}`, {
      params,
    });

    return data;
  } catch (error) {
    console.error('getClosetFolders', error);
  }
}

export async function getClosetFolderById(folderId?: number) {
  if (!folderId) return {} as ClosetFolderDetailsType;

  const { data } = await api.get<ClosetFolderDetailsType>(`/closet/folder/${folderId}`);

  return data;
}

export async function postClosetNewLook(newLook: PostClosetNewLookProps) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const formData = new FormData();

  formData.append(
    'owned_by_id',
    newLook.anotherUser ? `${newLook.anotherUser?.id}` : `${user?.id}`
  );
  formData.append('made_by_id', `${user?.id}`);

  if (newLook?.clothings?.length) {
    newLook?.clothings?.forEach((clothingId, index) => {
      formData.append(`clothings[${index}]`, `${clothingId}`);
    });
  }

  if (newLook?.attributes?.length) {
    newLook?.attributes?.forEach((attributeId, index) => {
      formData.append(`attributes[${index}][id]`, `${attributeId}`);
      formData.append(`attributes[${index}][main]`, 'false');
    });
  }

  if (newLook?.photo_url) {
    const photo = await uploadPhoto(newLook?.photo_url, false, 'looks-photo');

    formData.append('photo_url', photo as unknown as File);
  }

  if (newLook?.image_url) {
    const image = await uploadPhoto(newLook?.image_url, false, 'looks-photo');

    formData.append('image_url', image as unknown as File);
  }

  await api.post('/closet/looks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
}

export async function putClosetLook(lookId: number, newLook: PostClosetNewLookProps) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const formData = new FormData();

  formData.append('owned_by_id', `${user?.id}`);
  formData.append('made_by_id', `${user?.id}`);

  if (newLook.attributes?.length) {
    newLook.attributes?.forEach((attributeId, index) => {
      formData.append(`attributes[${index}][id]`, `${attributeId}`);
      formData.append(`attributes[${index}][main]`, 'false');
    });
  }

  if (newLook.photo_url && newLook.isNewPhoto) {
    const date = format(new Date(), 'yyyyMMddhhmmss');

    const file = {
      uri: newLook?.photo_url,
      type: 'image/jpeg',
      name: `photo_look_${date}.jpg`,
    };

    formData.append('photo', file as unknown as File);
  } else {
    newLook?.photo_url && formData.append('photo_url', newLook?.photo_url);
  }

  await api.put(`/closet/looks/${lookId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
}

export async function getClosetLooks(
  search?: string,
  filters?: { categories?: number[]; attributes?: number[] },
  cursor?: number
) {
  try {
    const user = getUserData();

    if (!user?.username) {
      throw new Error('Profile not found');
    }

    const { data } = await api.get<GetClosetLooksResponse>(`/closet/looks/${user.username}`, {
      params: {
        cursor,
        title: search,
        categories: filters?.categories?.join(','),
        attributes: filters?.attributes?.join(','),
      },
    });

    return data;
  } catch (error) {
    console.error('getClosetLooks', error);
  }
}

export async function getClosetLooksSuggestions(
  search?: string,
  filters?: { categories?: number[]; attributes?: number[] },
  cursor?: number
) {
  try {
    const user = getUserData();

    if (!user?.username) {
      throw new Error('Profile not found');
    }

    const { data } = await api.get<GetClosetLooksResponse>(
      `/closet/looks/${user.username}/suggestions`,
      {
        params: {
          cursor,
          title: search,
          categories: filters?.categories?.join(','),
          attributes: filters?.attributes?.join(','),
        },
      }
    );

    return data;
  } catch (error) {
    console.error('getClosetLooksSuggestions', error);
  }
}

export async function getClosetLookDetails(lookId: number) {
  const { data } = await api.get<ClosetLookType>(`/closet/look/${lookId}`);

  return data;
}

export async function getClosetInspirations(cursor?: number) {
  const user = getUserData();
  const { data } = await api.get<GetClosetInspirationsResponse>(
    `/closet/inspirations/${user?.username}`,
    {
      params: {
        cursor,
      },
    }
  );

  return data;
}

export async function deleteFolder(folderId: number) {
  await api.delete(`/closet/folder/${folderId}`);
}

export async function postInspirations(images: ImagePickerAsset[]) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const total = images.length;
  const uniqueId = uuid.v4();

  setInspirationsUpload({ uploaded: 1, total });

  for (const inspiration of images) {
    const formData = new FormData();
    const title = inspiration?.fileName ?? `${uniqueId}`;
    const file = {
      uri: inspiration.uri,
      type: 'image/jpeg',
      name: inspiration?.fileName ?? `${uuid.v4()}.jpg`,
    };

    formData.append('image', file as unknown as File);
    formData.append('title', title);
    formData.append('profile_id', `${user.id}`);

    await api.post('/closet/inspirations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 15000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2500));
    setInspirationsUpload({ uploaded: images.indexOf(inspiration) + 2, total });
  }

  setInspirationsUpload({ uploaded: 0, total: 0, success: true });
}

export async function getClosetClothingCommunity(
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

  const { data } = await api.get<GetClosetClothingsResponse>('/closet/clothing/community', {
    params: {
      ...params,
      cursor,
      limit: 15,
    },
  });

  return data;
}

export async function postClosetClothingCommunity(clothings: ClosetClothingType[]) {
  const user = getUserData();

  const clothingsId = clothings.map((clothing) => clothing.id);

  const payload = {
    profile_id: user?.id,
    clothings: clothingsId,
  };

  await api.post('/closet/clothing/community', payload);
}

export async function getClosetClothingDetails(clothingId: number) {
  const { data } = await api.get<ClosetClothingType>(`/closet/clothing/id/${clothingId}`);

  return data;
}
