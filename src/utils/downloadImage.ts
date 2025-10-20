import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const downloadImage = async (imageUrl: string) => {
  const date = format(new Date(), 'yyyyMMddhhmmss');
  const fileUri = `${FileSystem.documentDirectory}finti_${date}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    saveFile(res.uri);
  } catch (err) {
    console.error('FS Err: ', err);
  }
};

const saveFile = async (fileUri: string) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (err) {
    console.error('Save err: ', err);
  }
};

export { downloadImage };
