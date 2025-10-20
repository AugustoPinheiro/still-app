import React, { Ref, useEffect, useImperativeHandle, useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { PhotoFile } from 'react-native-vision-camera';

import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import EditIcon from '@/assets/images/editIcon.svg';
import { PhotoPickMenu } from '@/components/Photo/PhotoPickMenu';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { convertLocalImageToAsset } from '@/utils/convertLocalImageToAsset';

import * as S from './styles';

interface PhotoProps {
  onPickImage: (image: ImagePicker.ImagePickerAsset) => void;
  photo?: string;
  isBase64?: boolean;
}

export interface PhotoRef {
  reset: () => void;
  // openOptions: () => void;
}

export const Photo = React.forwardRef(
  ({ onPickImage, photo, isBase64 }: PhotoProps, ref: Ref<PhotoRef | undefined>) => {
    const navigation = useNavigation<any>();
    const [statusMedia, requestPermissionMedia] = ImagePicker.useMediaLibraryPermissions();
    const { expand, close, setBottomSheetProps } = useBottomSheet();
    const [pickedImagePath, setPickedImagePath] = useState('');

    const { show } = useToast();

    async function showImagePicker() {
      close();
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsEditing: false,
        });

        if (result?.assets?.length) {
          const imageUri = await convertLocalImageToAsset(result.assets[0].uri);
          const image = await ImageCropPicker.openCropper({
            mediaType: 'photo',
            path: imageUri,
            width: 250,
            height: 250,
            cropperCircleOverlay: true,
            hideBottomControls: true,
            compressImageQuality: 0.8,
            cropperToolbarTitle: 'Editar',
          });

          setPickedImagePath(image?.path);
          onPickImage({ height: 250, width: 250, uri: image?.path });
        }
      } catch (error) {
        console.error(error);

        show({
          type: 'error',
          message: 'Não foi possível carregar a imagem',
        });
      } finally {
        close();
      }
    }

    function handleTakePhoto() {
      try {
        close();
        const onTakePhoto = async (media: PhotoFile) => {
          const result = await ImageCropPicker.openCropper({
            mediaType: 'photo',
            path: 'file://' + media.path,
            width: 250,
            height: 250,
            cropperCircleOverlay: true,
            hideBottomControls: true,
            compressImageQuality: 0.8,
            cropperToolbarTitle: 'Editar',
          });

          if (result?.path) {
            setPickedImagePath(result.path);
            onPickImage({ height: 250, width: 250, uri: result.path });
          }
        };

        navigation.navigate('Camera', { onTakePhoto, goback: true });
      } catch (error) {
        show({
          type: 'error',
          message: 'Não foi possível carregar a imagem',
        });
      } finally {
        close();
      }
    }

    function handleExpandBottomSheet() {
      setBottomSheetProps({
        id: 'PhotoPickMenu',
        content: <PhotoPickMenu showCamera={handleTakePhoto} showImagePicker={showImagePicker} />,
        snapPoints: ['20%'],
      });

      expand();
    }

    useEffect(() => {
      if (!statusMedia?.granted) {
        requestPermissionMedia();
      }
    }, [statusMedia]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setPickedImagePath('');
        },
        // openOptions: () => {
        //   handleExpandBottomSheet();
        // },
      }),
      [handleExpandBottomSheet, setPickedImagePath]
    );

    if (!pickedImagePath && !photo) {
      return (
        <S.Container>
          <S.PhotoEmptyContent onPress={handleExpandBottomSheet}>
            <S.PhotoEmpty />
            <S.EditButton>
              <EditIcon width={14} height={14} />
            </S.EditButton>
          </S.PhotoEmptyContent>
        </S.Container>
      );
    }

    return (
      <S.Container>
        <S.PhotoContent onPress={handleExpandBottomSheet}>
          <S.Photo
            source={{ uri: pickedImagePath || photo }}
            contentFit="cover"
            cachePolicy="disk"
          />
          <S.EditButton>
            <EditIcon width={14} height={14} />
          </S.EditButton>
        </S.PhotoContent>
      </S.Container>
    );
  }
);
