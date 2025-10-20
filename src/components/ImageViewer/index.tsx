import React from 'react';
import { Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import * as S from './styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ImageViewerProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
}

export function ImageViewer({ visible, imageUri, onClose }: ImageViewerProps) {
  console.log('ImageViewer render - visible:', visible, 'imageUri:', imageUri);
  
  if (!visible) {
    return null;
  }
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <S.Container>
        <S.Backdrop onPress={onClose} />
        
        <S.ImageContainer>
          <Image
            source={{ uri: imageUri }}
            style={{
              width: screenWidth,
              height: screenHeight * 0.8,
            }}
            contentFit="contain"
            cachePolicy="disk"
          />
        </S.ImageContainer>

        <S.CloseButton onPress={onClose}>
          <MaterialCommunityIcons name="close" size={24} color="#FFF" />
        </S.CloseButton>
      </S.Container>
    </Modal>
  );
} 