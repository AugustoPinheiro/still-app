import uuid from 'react-native-uuid';

import axios from 'axios';

import { api } from '@/config/api';
import { EXPO_PUBLIC_XIMILAR_KEY, EXPO_PUBLIC_XIMILAR_URL } from '@/config/env';

interface UploadPhotoResponseApi {
  key: string;
  url: string;
}

export const removeBackground = async (photoBase64: string) => {
  const payload = {
    service: 'ID-Remove-Background',
    image_format: 'webp',
    image_quality: 30,
    records: [
      {
        _base64: photoBase64,
      },
    ],
  };

  const { data } = await axios.post(`${EXPO_PUBLIC_XIMILAR_URL}/removebg/fast/removebg`, payload, {
    headers: {
      Authorization: `Token ${EXPO_PUBLIC_XIMILAR_KEY}`,
    },
    timeout: 30000,
  });

  if (!data.url) throw new Error('Error on upload photo');

  return data.url;
};

export async function uploadPhoto(
  photo: string,
  removeBackground: boolean = true,
  folder?: string
): Promise<string | undefined> {
  const uniqueId = uuid.v4();

  const payload = {
    uri: photo,
    type: 'image/jpeg',
    name: `${uniqueId}.jpg`,
  };

  const formData = new FormData();
  formData.append('file', payload);
  formData.append('rmBg', removeBackground ? 'true' : 'false');

  if (folder) {
    formData.append('folder', folder);
  }

  const { data } = await api.post<UploadPhotoResponseApi>('file-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {},
    timeout: 30000,
  });

  if (!data.url) throw new Error('Error on upload photo');

  return data.url;
}
