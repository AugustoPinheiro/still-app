import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import type { Camera, PhotoFile, TakePhotoOptions } from 'react-native-vision-camera';

import { CAPTURE_BUTTON_SIZE } from './Constants';

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (media: PhotoFile, type: 'photo') => void;
  flash: 'off' | 'on';
}

const _CaptureButton: React.FC<Props> = ({
  camera,
  onMediaCaptured,
  flash,
  style,
  ...props
}): React.ReactElement => {
  const takePhotoOptions = useMemo<TakePhotoOptions>(
    () => ({
      flash,
      quality: 100,
      enableShutterSound: false,
    }),
    [flash]
  );

  // #region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      const photo = await camera.current.takePhoto(takePhotoOptions);
      onMediaCaptured(photo, 'photo');
    } catch (e) {}
  }, [camera, onMediaCaptured, takePhotoOptions]);

  return (
    <TouchableOpacity onPress={takePhoto} style={[style, styles.container]}>
      <View style={styles.flex}>
        {/* <View style={[styles.shadow]} /> */}
        <View style={styles.button} />
      </View>
    </TouchableOpacity>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    zIndex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: 'transparent',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
});
