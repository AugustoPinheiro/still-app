import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';
// import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';

// import { useTheme } from 'styled-components/native';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { TakePictureLayer } from '@/modules/Closet/screens/NewClothingPart/components/TakePictureLayer';
import { convertLocalImageToAsset } from '@/utils/convertLocalImageToAsset';

import * as S from './styles';

const TAKE_PICTURE_ID = 'TAKE_PICTURE_ID';
const PAGE_SIZE = 20;

const takePictureItem = {
  id: TAKE_PICTURE_ID,
} as PhotoIdentifier['node'];

export function NewClothingPartGallery({
  handleGoNewPost,
  inNewPost,
}: {
  handleGoNewPost?: (uri: string) => void;
  inNewPost?: boolean;
}) {
  // const theme = useTheme();
  const navigation = useNavigation();
  const [permissionCameraResponse, requestPermissionCamera] = ImagePicker.useCameraPermissions();
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [media, setMedia] = useState<Array<PhotoIdentifier['node']>>([takePictureItem]);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);
  // const [albums, setAlbums] = useState<Array<{ key: any; value: any }>>([]);
  // const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  // async function hasAndroidPermission() {
  //   try {
  //     setLoading(true);
  //     const getCheckPermissionPromise = async () => {
  //       if (Number(Platform.Version) >= 33) {
  //         return await Promise.all([
  //           PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
  //           PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
  //         ]).then(
  //           ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
  //             hasReadMediaImagesPermission && hasReadMediaVideoPermission
  //         );
  //       } else {
  //         return await PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //         );
  //       }
  //     };

  //     const hasPermission = await getCheckPermissionPromise();
  //     if (hasPermission) {
  //       return true;
  //     }
  //     const getRequestPermissionPromise = async () => {
  //       if (Number(Platform.Version) >= 33) {
  //         return await PermissionsAndroid.requestMultiple([
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //         ]).then(
  //           (statuses) =>
  //             statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
  //               PermissionsAndroid.RESULTS.GRANTED &&
  //             statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
  //               PermissionsAndroid.RESULTS.GRANTED
  //         );
  //       } else {
  //         return await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //         ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
  //       }
  //     };

  //     return await getRequestPermissionPromise();
  //   } catch (error) {
  //     console.error('error', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const getMediaAsync = useCallback(async (cursor?: string) => {
    try {
      setIsFetching(true);
      const {
        edges,
        page_info: { has_next_page: hasNextPageMedia, end_cursor: endCursorMedia },
      } = await CameraRoll.getPhotos({
        first: PAGE_SIZE,
        after: cursor,
        assetType: 'Photos',
        groupTypes: 'All',
        includeSharedAlbums: true,
        fromTime: 0,
      });

      const assets: Array<PhotoIdentifier['node']> = edges.map((item) => item.node);

      if (!assets.length) return;

      const nextEndCursor = Platform.select({
        ios: endCursorMedia,
        android: endCursorMedia,
      });

      setEndCursor(nextEndCursor);
      setHasNextPage(hasNextPageMedia);
      setMedia((prevState) => [
        ...prevState?.filter((item) => assets.some((asset) => asset.id !== item.id)),
        ...assets,
      ]);
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // const getAlbumsAsync = useCallback(async () => {
  //   try {
  //     const albumsAsync = await MediaLibrary.getAlbumsAsync();
  //     setAlbums([{ key: 'ALL', value: 'Recentes' }]);
  //     for (const album of albumsAsync) {
  //       setAlbums((prevState) => [...prevState, { key: album.id, value: album.title }]);
  //     }
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }, []);

  useEffect(() => {
    // hasAndroidPermission();
    requestPermissionCamera();

    try {
      setLoading(true);
      getMediaAsync();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    // getAlbumsAsync();
  }, []);

  // useEffect(() => {

  //   if (selectedAlbum) {
  //     setMedia([takePictureItem]);
  //     getMediaAsync(selectedAlbum);
  //   }
  // }, [selectedAlbum]);

  async function goToAddNewClothingPart(item: PhotoIdentifier['node']['image']) {
    try {
      setLoading(true);
      const image = await convertLocalImageToAsset(item.uri, !inNewPost);

      if (inNewPost && handleGoNewPost) {
        handleGoNewPost(image);
        return;
      }

      // @ts-expect-error
      navigation?.navigate('AddNewClothingPart', { image });
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  }

  function handleTakePicture() {
    try {
      setLoading(true);

      const onTakePhoto = async (media: PhotoFile) => {
        if (!media?.path) return;

        const image = await convertLocalImageToAsset(media.path, !inNewPost);

        if (inNewPost && handleGoNewPost) {
          handleGoNewPost(image);
          return;
        }
        // @ts-expect-error
        navigation?.navigate('AddNewClothingPart', { image });
      };

      // @ts-expect-error
      navigation.navigate('Camera', { onTakePhoto });
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  }

  if (!permissionCameraResponse) {
    // Camera permissions are still loading
    return <Loading />;
  }

  if (!permissionCameraResponse.granted) {
    // Camera permissions are not granted yet
    return (
      <S.ContainerPermissions>
        <Text style={{ textAlign: 'center' }}>
          Precisamos da sua permissão para acessar a galeria
        </Text>
        <Button
          onPress={() => {
            if (!permissionCameraResponse.granted) requestPermissionCamera();
          }}
          title="Conceder permissão"
        />
      </S.ContainerPermissions>
    );
  }

  function renderItem({ item, index }: { item: PhotoIdentifier['node']; index: number }) {
    if (item?.id === TAKE_PICTURE_ID) {
      return (
        <S.ImageContainer key={`${TAKE_PICTURE_ID}_${index}`} onPress={handleTakePicture}>
          <TakePictureLayer />
        </S.ImageContainer>
      );
    }

    return (
      <S.ImageContainer
        key={`imageContainer_${item?.id}_${index}`}
        onPress={async () => await goToAddNewClothingPart(item?.image)}
      >
        <S.Image
          key={`imageContainer_${item?.id}_${index}`}
          source={{ uri: item?.image?.uri }}
          cachePolicy="disk"
        />
      </S.ImageContainer>
    );
  }

  return (
    <S.Container>
      {isLoading && <Loading />}
      {/* <S.SelectContainer>
        <SelectList
          inputStyles={{
            color: theme?.colors.gray02,
            fontFamily: theme?.fonts.REGULAR,
            fontSize: theme?.fontSizes.XS,
            flex: 1,
          }}
          boxStyles={{
            borderRadius: 4,
            borderColor: theme?.colors.gray06,
            paddingLeft: 12,
          }}
          dropdownStyles={{
            borderColor: theme?.colors.gray06,
            borderTopColor: 'transparent',
            position: 'absolute',
            width: '100%',
            backgroundColor: theme?.colors.white,
            top: 35,
            borderRadius: 0,
          }}
          dropdownTextStyles={{ color: theme?.colors.gray02 }}
          data={albums as any}
          searchPlaceholder="Pesquisar album"
          placeholder="Selecione um album"
          setSelected={(selected: any) => setSelectedAlbum(selected)}
          defaultOption={{ key: 'ALL', value: 'Recentes' }}
        />
      </S.SelectContainer> */}
      <FlatList
        data={media}
        renderItem={renderItem}
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{
          gap: 8,
        }}
        keyExtractor={(item) => item.id}
        onEndReached={async () => {
          if (!hasNextPage || isLoading || isFetching) return;

          await getMediaAsync(endCursor);
        }}
        onEndReachedThreshold={1}
      />
    </S.Container>
  );
}
