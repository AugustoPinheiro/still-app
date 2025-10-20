import RNFS from 'react-native-fs';

import { convertLocalImageToAsset } from '@/utils/convertLocalImageToAsset';

export const convertImageToBase64 = async (localIdentifier: string) => {
  const asset = await convertLocalImageToAsset(localIdentifier);
  const imagePath = asset.uri.replace('file://', '');
  const imageBase64 = await RNFS.readFile(imagePath, 'base64');
  return imageBase64;
};
