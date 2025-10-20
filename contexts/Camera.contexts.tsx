import React, { createContext } from 'react';
import { PhotoFile } from 'react-native-vision-camera';

type CameraContextProps = {
  onTakePicture: (media: PhotoFile) => void;
  showCamera: boolean;
  openCamera: () => void;
  closeCamera: () => void;
  cameraPosition: 'front' | 'back';
  setCameraPosition: React.Dispatch<React.SetStateAction<'front' | 'back'>>;
  media: PhotoFile | undefined;
  clearMedia: () => void;
};

type CameraProviderProps = {
  children: React.ReactNode;
};

export const CameraContext = createContext({} as CameraContextProps);

export const CameraProvider = ({ children }: CameraProviderProps) => {
  const [showCamera, setShowCamera] = React.useState(false);
  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>('back');
  const [media, setMedia] = React.useState<PhotoFile | undefined>(undefined);

  function openCamera() {
    setShowCamera(true);
    setMedia(undefined);
  }

  function closeCamera() {
    setShowCamera(false);
  }

  function clearMedia() {
    setMedia(undefined);
  }

  function onTakePicture(media: PhotoFile) {
    setMedia(media);
    closeCamera();
  }

  return (
    <CameraContext.Provider
      value={{
        onTakePicture,
        openCamera,
        showCamera,
        cameraPosition,
        setCameraPosition,
        media,
        closeCamera,
        clearMedia,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = (): CameraContextProps => {
  const context = React.useContext(CameraContext);

  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }

  return context;
};
