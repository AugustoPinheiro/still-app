import { api } from '@/config/api';
import { getUserData, setProfile } from '@/config/mmkvStorage';
import { CreateCard, CreditCard, ResponseCreateCard } from '@/types/CreditCardType';
import { FollowersListProps, ProfileType } from '@/types/ProfileType';
import { ResponseType } from '@/types/ResponseType';
import { SocialFeedType } from '@/types/SocialFeedType';

export async function getProfileByUsername(username?: string): Promise<ProfileType | undefined> {
  try {
    const userData = getUserData();

    if (!userData?.username) {
      throw new Error('Username not found');
    }

    const { data } = await api.get<ProfileType>(`/profiles/${username ?? userData.username}`);

    if (!data) {
      throw new Error('Profile not found');
    }

    setProfile(data);

    return data;
  } catch (error) {
    console.error('getProfileByUsername', error);
  }
}

export async function getMyFollowers(
  username: string,
  page?: number
): Promise<FollowersListProps | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const { data } = await api.get<FollowersListProps>(`/profiles/${username}/followers`, {
      params: {
        cursor: page,
      },
    });

    if (!data) {
      throw new Error('Posts not found');
    }
    return data;
  } catch (error) {
    console.error('getMyFollowers', error);
  }
}

export async function getMyFollowing(
  username: string,
  page?: number
): Promise<FollowersListProps | undefined> {
  try {
    if (!username) {
      throw new Error('Username not found');
    }

    const { data } = await api.get<FollowersListProps>(`/profiles/${username}/following`, {
      params: {
        cursor: page,
      },
    });

    if (!data) {
      throw new Error('Posts not found');
    }
    return data;
  } catch (error) {
    console.error('getMyFollowing', error);
  }
}

export async function unfollowUser(userName: string): Promise<void> {
  try {
    const userData = getUserData();
    if (!userName) {
      throw new Error('Username not found');
    }

    if (!userData?.username) {
      throw new Error('Username not found');
    }
    await api.put(`/profiles/${userData.username}/unfollow/${userName}`);
  } catch (error) {
    console.error('followOrUnfolloUser', error);
  }
}

export async function removerFollowUser(userName: string): Promise<void> {
  try {
    const userData = getUserData();
    if (!userName) {
      throw new Error('Username not found');
    }

    if (!userData?.username) {
      throw new Error('Username not found');
    }
    await api.put(`/profiles/${userData.username}/remove-follower/${userName}`);
  } catch (error) {
    console.error('followOrUnfolloUser', error);
  }
}

export async function getProfilePosts(cursor?: number) {
  const user = getUserData();

  if (!user?.id) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<SocialFeedType[]>>(`/social/posts/${user.id}`, {
    params: { cursor, limit: 10 },
  });

  return data;
}

export async function getProfileArchivedPosts(cursor?: number) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<SocialFeedType[]>>(`/social/archive/${user.id}`, {
    params: { cursor },
  });

  return data;
}

export async function getProfileCards(cursor?: number) {
  const user = getUserData();

  if (!user?.username) {
    throw new Error('Profile not found');
  }

  const { data } = await api.get<ResponseType<CreditCard[]>>(`/payment-methods/${user.id}`, {
    params: { cursor },
  });

  return data;
}

export async function postProfileCard(payload: CreateCard) {
  try {
    const user = getUserData();
    if (!user?.username) {
      throw new Error('Profile not found');
    }
  
    const data = await api.post<ResponseCreateCard>(`/payment-methods/${user.id}`, payload);
  
    return data;
  } catch (error: any) {
    console.error('postProfileCard', error);
    throw new Error(error.message);
  }
}

export async function deleteProfileCard(card_id: number) {
  try {
    const user = getUserData();
    if (!user?.username) {
      throw new Error('Profile not found');
    }
  
    const data = await api.delete<ResponseCreateCard>(`/payment-methods/${user.id}/${card_id}`);
  
    return data;
  } catch (error: any) {
    console.error('deleteProfileCard', error);
    throw new Error(error.message);
  }
}
