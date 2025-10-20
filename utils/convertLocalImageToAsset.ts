import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

import { format } from 'date-fns';

const resizeImage = async (imageUri: string, small?: boolean) => {
  const width = small ? 1000 : 1080;
  const height = small ? 1000 : 1920;

  const resizedImage = await ImageResizer.createResizedImage(
    imageUri,
    width, // largura máxima
    height, // altura máxima
    'JPEG', // formato
    100 // qualidade
  );

  return resizedImage.uri;
};

export const convertLocalImageToAsset = async (localIdentifier: string, small?: boolean) => {
  const date = format(new Date(), 'yyyyMMddhhmmss');
  const destPath = `${RNFS.TemporaryDirectoryPath}/${date}.jpg`;
  const width = small ? 1000 : 1080;
  const height = small ? 1000 : 1920;

  if (Platform.OS === 'android' || !localIdentifier.includes('ph://')) {
    const assetAndroid = await resizeImage(localIdentifier, small);

    return assetAndroid;
  }

  const asset = await RNFS.copyAssetsFileIOS(localIdentifier, destPath, width, height);
  return asset;
};
