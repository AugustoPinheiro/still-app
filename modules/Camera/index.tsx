import React from 'react';
import { PhotoFile } from 'react-native-vision-camera';

import { CameraComponent } from '@/components/Camera';
import { GenericPageProp } from '@/types/GenericPageProp';

type CameraProps = GenericPageProp & {
  route: {
    params: {
      onTakePhoto: (media: PhotoFile) => void;
      position?: 'front' | 'back';
      goback?: boolean;
    };
  };
};

export function CameraPage({ navigation, route }: CameraProps) {
  const { params } = route;
  const onTakePhoto = params?.onTakePhoto;
  const position = params?.position ?? 'back';
  const goback = params?.goback ?? false;

  function handleClose() {
    navigation.goBack();
  }

  return (
    <CameraComponent
      onTakePhoto={onTakePhoto}
      position={position}
      close={handleClose}
      goback={goback}
    />
  );
}
