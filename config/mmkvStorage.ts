import { MMKV } from 'react-native-mmkv';

import { ProfileType } from '@/types/ProfileType';

export const storage = new MMKV({ id: 'br.com.stillapp' });

export const clearStorage = (): void => {
  storage.clearAll();
};

export const setAccessToken = (token: string): void => {
  storage.set('accessToken', token);
};

export const getAccessToken = (): string | undefined => {
  return storage.getString('accessToken');
};

export const setProfile = (profile: ProfileType): void => {
  storage.set('profile', JSON.stringify(profile));
};

export const isLogged = (): boolean => {
  const data = storage.getString('accessToken');

  if (!data) return false;

  return true;
};

export const getProfile = (): ProfileType | undefined => {
  const data = storage.getString('profile');

  if (!data) return;

  return JSON.parse(data);
};

export const setProfiles = (profiles: ProfileType[]): void => {
  storage.set('profiles', JSON.stringify(profiles));
};

export const getProfiles = (): ProfileType[] | undefined => {
  const data = storage.getString('profiles');

  if (!data) return;

  return JSON.parse(data);
};

export const setUserData = (profile: ProfileType): void => {
  storage.set('profile', JSON.stringify(profile));
};

export const getUserData = (): ProfileType | undefined => {
  const data = storage.getString('profile');

  if (!data) return;

  return JSON.parse(data);
};

export const getInspirationsUpload = (): { uploaded: number; total: number; success?: boolean } => {
  const data = storage.getString('inspirationsUpload');

  if (!data) return { uploaded: 0, total: 0 };

  return JSON.parse(data);
};

export const setInspirationsUpload = (data: {
  uploaded: number;
  total: number;
  success?: boolean;
}): void => {
  storage.set('inspirationsUpload', JSON.stringify(data));
};

export const setChatInit = (init: boolean): void => {
  storage.set('chatUser', JSON.stringify(init));
};

export const getChatInit = (): boolean => {
  const data = storage.getString('chatUser');

  if (!data) return false;

  return JSON.parse(data);
};

export const setChatHasMessages = (hasMessages: boolean): void => {
  storage.set('chatHasMessages', JSON.stringify(hasMessages));
};

export const getChatHasMessages = (): boolean => {
  const data = storage.getString('chatHasMessages');

  if (!data) return false;

  return JSON.parse(data);
};

export const getHasRegister = (): boolean => {
  const data = storage.getString('hasRegister');

  if (!data) return false;

  return JSON.parse(data);
};

export const setHasRegister = (hasRegister: boolean): void => {
  storage.set('hasRegister', JSON.stringify(hasRegister));
};

export const deleteAccount = (): void => {
  storage.set('delelteAccount', 'true');
};

export const getDeleteAccount = (): string | undefined => {
  return storage.getString('delelteAccount');
};

export const getIsChatConnected = (): boolean => {
  const data = storage.getString('chatConnected');

  if (!data) return false;

  return JSON.parse(data);
};

export const setIsChatConnected = (connected: boolean): void => {
  storage.set('chatConnected', JSON.stringify(connected));
};
