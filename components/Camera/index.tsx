import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import IonIcon from '@expo/vector-icons/Ionicons';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { usePreferredCameraDevice } from '@/hooks/usePreferredCameraDevice';

import { CaptureButton } from './CaptureButtom';
import {
  CAPTURE_BUTTON_SIZE,
  CONTENT_SPACING,
  CONTROL_BUTTON_SIZE,
  SAFE_AREA_PADDING,
} from './Constants';

type CameraProps = {
  onTakePhoto: (media: PhotoFile) => void;
  position?: 'front' | 'back';
  close: () => void;
  goback?: boolean;
};

export function CameraComponent({ onTakePhoto, close, goback }: CameraProps) {
  const camera = useRef<Camera>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  // camera device settings
  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>('back');
  const [preferredDevice] = usePreferredCameraDevice();
  let device = useCameraDevice(cameraPosition);

  if (preferredDevice != null && preferredDevice.position === cameraPosition) {
    // override default device with the one selected by the user in settings
    device = preferredDevice;
  }

  // const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  // const format = useCameraFormat(device, [
  //   {
  //     photoHdr: true,
  //     fps: 30,
  //   },
  // ]);

  const supportsFlash = device?.hasFlash ?? false;

  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
    close();
  }, []);

  const onMediaCaptured = useCallback(
    (media: PhotoFile, type: 'photo') => {
      onTakePhoto(media);
      goback && close();
    },
    [onTakePhoto, goback]
  );

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);
  // #endregion

  useEffect(() => {
    !hasPermission && requestPermission();
  }, [hasPermission]);

  if (device === null) {
    return <></>;
  }

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, { backgroundColor: 'black' }]}>
      {device != null && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          onError={onError}
          enableZoomGesture={true}
          photo={true}
          orientation="portrait"
          exposure={Platform.OS === 'ios' ? undefined : 1}
        />
      )}

      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        flash={supportsFlash ? flash : 'off'}
      />

      <View style={styles.backButton}>
        <TouchableOpacity style={styles.button} onPress={close} activeOpacity={0.4}>
          <MaterialIcon name="arrow-left" color="white" size={24} />
        </TouchableOpacity>

        {supportsFlash && (
          <TouchableOpacity style={styles.button} onPress={onFlashPressed} activeOpacity={0.4}>
            <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rightButtonRow}>
        <TouchableOpacity style={styles.button} onPress={onFlipCameraPressed} activeOpacity={0.4}>
          <IonIcon name="camera-reverse" color="white" size={24} />
        </TouchableOpacity>

        {/* {supportsHdr && (
          <TouchableOpacity style={styles.button} onPress={() => setEnableHdr((h) => !h)}>
            <MaterialIcon name={enableHdr ? 'hdr' : 'hdr-off'} color="white" size={24} />
          </TouchableOpacity>
        )}
        {canToggleNightMode && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEnableNightMode(!enableNightMode)}
            activeOpacity={0.4}
          >
            <IonIcon name={enableNightMode ? 'moon' : 'moon-outline'} color="white" size={24} />
          </TouchableOpacity>
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? SAFE_AREA_PADDING.paddingTop
        : SAFE_AREA_PADDING.paddingTop + CONTENT_SPACING + 20,
    left: 0,
    right: 0,
    paddingHorizontal: CONTENT_SPACING + 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: CONTENT_SPACING,
  },
  rightButtonRow: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: SAFE_AREA_PADDING.paddingBottom,
    flexDirection: 'row-reverse',
    paddingHorizontal: CONTENT_SPACING + 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: CAPTURE_BUTTON_SIZE + CONTENT_SPACING,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
