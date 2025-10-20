import uuid from 'react-native-uuid';

import { ImagePickerAsset } from 'expo-image-picker';

import { api } from '@/config/api';
import { getProfile as getProfileStorage, getUserData } from '@/config/mmkvStorage';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';
import { ProfileType } from '@/types/ProfileType';

type updateProfileParamsType = {
  name: string;
  avatar: string;
  cover?: string;
  bio?: string;
  username?: string;
  active?: boolean;
  last_name?: string;
  birth_date?: string;
  cc_email: string;
  type?: string;
  cpf?: string;
  phone_number?: string;
  document_number?: string;
};

type updatePrivacyParamsType = {
  notify_email?: boolean;
  notify_push?: boolean;
  profile?: boolean;
  closet?: boolean;
  favorites?: boolean;
  active?: boolean;
  private?: boolean;
};

export type ResponseTags = {
  id: number;
  title: string;
};

interface LoginResponseApi {
  access_token: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export async function updateProfile(profile: updateProfileParamsType, image?: ImagePickerAsset) {
  try {
    const profileStore = getProfileStorage();
    const arrName = profile.name.split(' ');
    const hasLastName = arrName.length > 1;
    const lastName = hasLastName ? arrName.pop() : '';
    const firstName = hasLastName ? arrName.join(' ') : profile.name;
    const formData = new FormData();

    if (image?.uri) {
      const file = {
        uri: image.uri,
        type: 'image/jpeg',
        name: image?.fileName ?? `${uuid.v4()}.jpg`,
      };

      formData.append('avatar', file as unknown as File);
    } else {
      formData.append('avatar', profile.avatar);
    }

    if (profile?.username) {
      formData.append('username', profile.username);
    }

    if (profileStore?.profile_type === 'common') {
      formData.append('name', firstName);
      formData.append('last_name', `${lastName}`);
    } else {
      formData.append('name', profile.name);
    }

    formData.append('type', profileStore?.profile_type ?? '');

    if (profile?.document_number) {
      formData.append('document_number', profile?.document_number ?? '');
      formData.append('document_type', profileStore?.profile_type === 'common' ? 'cpf' : 'cnpj');
    }

    if (profile?.phone_number) {
      formData.append('phone_number', profile.phone_number);
    }

    const { data } = await api.put<ProfileType>(`/profiles/${profileStore?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });

    await getProfileByUsername(profile?.username);

    return data;
  } catch (error) {
    console.error('updateProfile', error);
  }
}

export async function updateBio(userId: number, bio: string) {
  const formData = new FormData();
  formData.append('type', 'professional');
  formData.append('bio', bio);

  await api.put(`/profiles/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  await getProfileByUsername();
}

export async function updatePrivacy(profilePrivacy: updatePrivacyParamsType) {
  try {
    const profileStore = getProfileStorage();

    await api.post<ProfileType>(`/profiles/${profileStore?.username}/privacy`, profilePrivacy);
  } catch (error: any) {
    console.error('updateProfile', error);
    throw new Error(error.message);
  }
}

export async function changePassword(password: string, newPassword: string) {
  const payload = {
    password,
    newPassword,
  };

  await api.post(`/users/change-password`, payload);
}

export async function getTags(type: string = 'tag') {
  try {
    const response = await api.get<ResponseTags[]>(`/tags?type=${type}`);

    return response.data;
  } catch (error) {
    console.error('getTags', error);
  }
}

export async function putTags(tags: number[]): Promise<void> {
  const user = getUserData();
  const profileId = user?.id;

  await api.put(`/profiles/${profileId}/tags`, { tags });
  await getProfileByUsername();
}

export async function getOffersByStatus(
  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed',
  cursor?: number,
  myOwn?: boolean
) {
  const user = getUserData();

  if (!user?.id) {
    return;
  }

  const { data } = await api.get(`/offers/${user.id}`, {
    params: {
      status,
      cursor,
      made_by_me: myOwn,
    },
  });

  return data?.result;
}

export async function putOfferCancel(offerId: number) {
  const { data } = await api.put(`/offers/${offerId}/cancel`);

  return data?.result;
}

export async function getOffersTransactions(
  status: 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed',
  cursor?: number
) {
  const user = getUserData();

  if (!user?.id) {
    return;
  }

  const { data } = await api.get(`/offers/transactions/${user.id}`, {
    params: {
      status,
      cursor,
    },
  });

  return data?.result;
}

export async function getOffersTransactionsBalance() {
  const user = getUserData();

  if (!user?.id) {
    return;
  }

  const { data } = await api.get(`/offers/transactions/${user.id}/balance`);

  return data;
}

export async function putOfferTransaction(transactionId: number, value: number) {
  const { data } = await api.put(`/offers/transactions/${transactionId}`, { value });

  return data?.result;
}

export async function unblockUserbyUsername(userName: string): Promise<void> {
  try {
    const userData = getUserData();
    if (!userName) {
      throw new Error('Username not found');
    }

    if (!userData?.username) {
      throw new Error('Username not found');
    }
    await api.put(`/profiles/${userData.username}/unblock/${userName}`);
    await getProfileByUsername();
  } catch (error) {
    console.error('followOrUnfolloUser', error);
  }
}

export async function postContactUs(data: {
  subject: string;
  message: string;
  email: string;
  phone_number?: string;
}): Promise<void> {
  await api.post(`/contact-us`, data);
}

export async function checkPassword({ email, password }: LoginProps): Promise<boolean> {
  const { data } = await api.post<LoginResponseApi>('/auth/login', { email, password });

  return Boolean(data?.access_token);
}

export async function deleteProfile(profileId: number) {
  await api.delete(`/profiles/${profileId}`);
}
