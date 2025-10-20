import React, { useCallback, useEffect, useState } from 'react';
import { Dirs, FileSystem } from 'react-native-file-access';

import SHA1 from 'crypto-js/sha1';
import { Image, ImageProps, ImageSource } from 'expo-image';

type Props = ImageProps;

function CacheImage({ source: sourceParam, ...props }: Props) {
  const [source, setSource] = useState<ImageSource | null>(null);
  const imageSource =
    typeof sourceParam === 'string' ? { uri: sourceParam } : (sourceParam as ImageSource);

  const fetchImage = useCallback(async () => {
    try {
      const cachePath = await getCachePath(imageSource?.uri ?? '');
      const fileExists = await FileSystem.exists(cachePath);
      if (fileExists) {
        setSource({ ...imageSource, uri: `file://${cachePath}` });
        return;
      }

      const base64data = await downloadImage(imageSource?.uri ?? '');
      await FileSystem.writeFile(cachePath, base64data, 'base64');
      setSource({ ...imageSource, uri: `file://${cachePath}` });
    } catch (error) {
      console.error('Error caching image', error);
      setSource(imageSource); // set the source to the original URI if an error occurs
    }
  }, [imageSource]);

  useEffect(() => {
    fetchImage();
  }, []);

  return source ? <Image source={source} {...props} /> : <></>;
}

async function getCachePath(uri: string) {
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    !uri.includes('?') ? uri.length : uri.indexOf('?')
  );

  const ext = !filename.includes('.') ? '.jpg' : filename.substring(filename.lastIndexOf('.'));
  const sha = SHA1(uri);
  const cacheKey = `${sha}${ext}`;
  const cacheDir = Dirs.CacheDir;
  const cachePath = `${Dirs.CacheDir}/${cacheKey}`;

  const dirExists = await FileSystem.exists(cacheDir);
  if (!dirExists) {
    await FileSystem.mkdir(cacheDir);
  }

  return cachePath;
}

async function downloadImage(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const reader = new FileReader();
  const dataUrlPromise = new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      const base64data = reader.result;
      if (typeof base64data === 'string') {
        resolve(base64data.substring(base64data.indexOf(',') + 1)); // remove the `data:` scheme and the MIME type
      } else {
        reject(new Error('Failed to read blob as data URL'));
      }
    };
  });
  reader.readAsDataURL(blob);
  return await dataUrlPromise;
}

const CacheImageAsync = React.memo(CacheImage);

export { CacheImageAsync as CacheImage };
