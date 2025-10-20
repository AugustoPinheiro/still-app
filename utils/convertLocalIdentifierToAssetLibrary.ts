export const convertLocalIdentifierToAssetLibrary = (localIdentifier: string, ext: string) => {
  const hash = localIdentifier.split('/')[0];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
};
