import { api } from '@/config/api';
import { setAccessToken, setProfiles, setUserData } from '@/config/mmkvStorage';
import { ProfileType } from '@/types/ProfileType';

interface LoginResponseApi {
  access_token: string;
}

interface ProfileResponseApi extends ProfileType {}

interface LoginProps {
  email: string;
  password: string;
}

export async function getProfile(currentProfileId?: number): Promise<any> {
  const { data } = await api.get<[ProfileResponseApi]>('/profiles');

  if (!data[0]) {
    throw new Error('Profile not found');
  }

  const profileSelected = currentProfileId
    ? data.filter((profile) => profile.id === currentProfileId)?.[0] || data[0]
    : data[0];

  setUserData(profileSelected);
  setProfiles(data);

  return profileSelected;
}

export async function login({ email, password }: LoginProps): Promise<ProfileType> {
  const { data } = await api.post<LoginResponseApi>('/auth/login', { email, password });
  setAccessToken(data.access_token);

  const user = await getProfile();
  return user;
}

export async function getNewProfile(username: string): Promise<ProfileType | undefined> {
  const { data } = await api.get<[ProfileResponseApi]>(`/profiles`);

  if (!data?.length) {
    throw new Error('Profile not found');
  }

  const profile = data?.filter((profile) => profile.username === username)?.[0];

  if (!profile) {
    throw new Error('Profile not found');
  }

  setUserData(profile);
  setProfiles(data);

  return profile;
}
