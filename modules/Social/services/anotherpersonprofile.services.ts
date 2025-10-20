import { api } from '@/config/api';
import { getUserData } from '@/config/mmkvStorage';
import {
  ClosetClothingListsType,
  ClosetItemProps,
  ClosetLookListsType,
} from '@/types/ClosetClothingType';
import { PostsListsType } from '@/types/PostsType';
import { ProfileAnotherUserType } from '@/types/ProfileType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

export async function getProfileByProfileId(
  userName: string
): Promise<ProfileAnotherUserType | undefined> {
  try {
    if (!userName) {
      throw new Error('Username not found');
    }

    const userData = getUserData();

    if (!userData?.id) {
      throw new Error('Id not found');
    }

    const { data } = await api.get<ProfileAnotherUserType>(
      `/profiles/view/${userName}/${userData.id}`
    );

    if (!data) {
      throw new Error('Profile not found');
    }

    return data;
  } catch (error) {
    console.error('getProfileByProfileId', error);
  }
}

export async function getSocialPostsByUsername(
  username: string,
  cursor?: number
): Promise<PostsListsType | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const userData = getUserData();

    if (!userData?.id) {
      throw new Error('Id not found');
    }

    const { data } = await api.get<PostsListsType>(`/social/feed/${userData.id}/${username}`, {
      params: { cursor },
    });

    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function getClosetByUsername(
  username: string,
  cursor?: number,
  search?: string
): Promise<ClosetClothingListsType | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const userData = getUserData();

    if (!userData?.id) {
      throw new Error('Id not found');
    }

    const url =
      userData?.username === username
        ? `/closet/clothing/user/${username}`
        : `/closet/clothing/user/${username}/${userData.id}`;

    const { data } = await api.get<ClosetClothingListsType>(url, {
      params: { cursor, title: search },
    });

    if (!data) {
      throw new Error('Clothings not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function getClosetLookByUsername(
  username: string,
  cursor?: number
): Promise<ClosetLookListsType | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const userData = getUserData();

    if (!userData?.id) {
      throw new Error('Id not found');
    }

    const url =
      userData?.username === username
        ? `/closet/looks/${username}`
        : `/closet/look/user/${username}/${userData.id}`;

    const { data } = await api.get<ClosetLookListsType>(url, {
      params: { cursor },
    });

    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function getSocialPostsSavedByUsername(
  username: string,
  page = 1
): Promise<SocialSavedPostFolderType[] | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const userData = getUserData();

    if (!userData?.id) {
      throw new Error('Id not found');
    }
    const { data } = await api.get<SocialSavedPostFolderType[]>(
      `/social/saved-posts/folders/${username}/${userData.id}?cursor=${page === 1 ? '' : page}`
    );

    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function getClosetPostsByUsername(
  userName: string
): Promise<ClosetClothingListsType | undefined> {
  try {
    if (!userName) {
      throw new Error('Username not found');
    }

    const { data } = await api.get<ClosetClothingListsType>(`/closet/clothing/user/${userName}`);

    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function followOrUnfolloUser(
  userName: string,
  isFollow: boolean
): Promise<boolean | undefined> {
  try {
    const userData = getUserData();
    if (!userName) {
      throw new Error('Username not found');
    }

    if (!userData?.username) {
      throw new Error('Username not found');
    }

    if (isFollow) {
      await api.put(`/profiles/${userData.username}/follow/${userName}`);
    } else {
      await api.put(`/profiles/${userData.username}/unfollow/${userName}`);
    }

    return isFollow;
  } catch (error) {
    console.error('followOrUnfolloUser', error);
  }
}

export async function blockUserbyUsername(userName: string): Promise<void> {
  try {
    const userData = getUserData();
    if (!userName) {
      throw new Error('Username not found');
    }

    if (!userData?.username) {
      throw new Error('Username not found');
    }
    await api.put(`/profiles/${userData.username}/block/${userName}`);
  } catch (error) {
    console.error('followOrUnfolloUser', error);
  }
}

export async function getClosetById(id: string): Promise<ClosetItemProps | undefined> {
  try {
    if (!id) {
      throw new Error('Id not found');
    }
    const { data } = await api.get<ClosetItemProps>(`/closet/clothing/id/${id}`);
    if (!data) {
      throw new Error('Posts not found');
    }

    return data;
  } catch (error) {
    console.error('getSocialPostsById', error);
  }
}

export async function archivePostById(id: string): Promise<void> {
  try {
    if (!id) {
      throw new Error('Id is required');
    }

    await api.put(`/social/post/${id}/archive`);
  } catch (error) {
    console.error('archivePostById', error);
  }
}

export async function unarchivePostById(id: string): Promise<void> {
  try {
    if (!id) {
      throw new Error('Id is required');
    }

    await api.put(`/social/post/${id}/unarchive`);
  } catch (error) {
    console.error('archivePostById', error);
  }
}

export async function deletePostById(id: string, archived = false): Promise<void> {
  if (!id) {
    throw new Error('Id is required');
  }

  await api.delete(`/social/post/${id}`, { params: { get_archived: archived } });
}
