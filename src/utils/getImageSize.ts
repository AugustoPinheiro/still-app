import RNFS from 'react-native-fs';

export const getImageSize = async (uri: string) => {
  const fileInfo = await RNFS.stat(uri);
  const fileSizeInBytes = fileInfo.size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  return fileSizeInKB;
};
