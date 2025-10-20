import uuid from 'react-native-uuid';

import { format } from 'date-fns';

import { api } from '@/config/api';
import { EProfile } from '@/modules/Discovery/contexts/discovery.contexts';
import { RegisterType } from '@/types/RegisterType';

interface UploadPhotoResponseApi {
  key: string;
  url: string;
}

interface RegisterResponseApi {
  id: number;
  name: string;
  email: string;
}

export async function registerUser(
  payload: RegisterType,
  profile: EProfile | null,
  isCreateProfile?: boolean
): Promise<RegisterResponseApi | undefined> {
  const name = `${payload.name}`;
  const arrName = name.split(' ');
  const hasLastName = arrName.length > 1;
  const lastName = hasLastName ? arrName.pop() : '';
  const firstName = hasLastName ? arrName.join(' ') : payload.name;
  const formData = new FormData();
  const profileCommon = !isCreateProfile ? 'profileCommon' : 'common';
  const profileProfessional = !isCreateProfile ? 'profileProfessional' : 'professional';
  const profileStore = !isCreateProfile ? 'profileStore' : 'store';

  if (payload.avatar?.uri) {
    const file = {
      uri: payload.avatar.uri,
      type: 'image/jpeg',
      name: payload.avatar?.fileName ?? `${uuid.v4()}.jpg`,
    };

    formData.append('avatar', file as unknown as File);
  }

  if (!isCreateProfile) {
    formData.append('email', payload.email);
    formData.append('name', payload.name);
    formData.append('password', payload.password);
    formData.append('cpf', payload?.cpf ?? payload?.cnpj ?? '');
  }

  switch (profile) {
    case EProfile.STORE: {
      formData.append(`${profileStore}[name]`, firstName);
      formData.append(`${profileStore}[username]`, payload.username);
      formData.append(`${profileStore}[document_number]`, payload?.cnpj ?? '');
      formData.append(`${profileStore}[document_type]`, 'cnpj');
      formData.append(`${profileStore}[phone_number]`, payload?.phone_number ?? '');
      break;
    }
    case EProfile.PERSONAL_STYLIST: {
      formData.append(`${profileProfessional}[name]`, payload.name);
      formData.append(`${profileProfessional}[username]`, payload.username);
      formData.append(`${profileProfessional}[cc_email]`, payload.email);
      formData.append(`${profileProfessional}[document_number]`, payload?.cnpj ?? '');
      formData.append(`${profileProfessional}[document_type]`, 'cnpj');
      formData.append(`${profileProfessional}[phone_number]`, payload?.phone_number ?? '');
      break;
    }
    case EProfile.PERSONAL:
    default: {
      formData.append(`${profileCommon}[name]`, firstName);
      formData.append(`${profileCommon}[last_name]`, lastName ?? '');
      formData.append(`${profileCommon}[username]`, payload.username);
      formData.append(`${profileCommon}[birth_date]`, format(new Date(), 'yyyy-MM-dd'));
      formData.append(`${profileCommon}[document_number]`, payload?.cpf ?? '');
      formData.append(`${profileCommon}[document_type]`, 'cpf');
      formData.append(`${profileCommon}[phone_number]`, payload?.phone_number ?? '');
      break;
    }
  }

  if (isCreateProfile) {
    const { data } = await api.post<RegisterResponseApi>('/profiles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });

    return data;
  }

  const { data } = await api.post<RegisterResponseApi>('/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });

  return data;
}

export async function checkUsernameAvailability(username: string): Promise<boolean | undefined> {
  try {
    await api.get(`/profiles/check-username/${username}`);

    return true;
  } catch (error: any) {
    if (error?.status === 409) {
      return false;
    }
  }
}

export async function uploadPhoto(photo: string): Promise<string | undefined> {
  const uniqueId = uuid.v4();

  const payload = {
    uri: photo,
    type: 'image/jpeg',
    name: `${uniqueId}_avatar.jpg`,
  };

  const formData = new FormData();
  formData.append('file', payload as any);

  const { data } = await api.post<UploadPhotoResponseApi>('file-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!data.url) throw new Error('Error on upload photo');

  return data.url;
}
