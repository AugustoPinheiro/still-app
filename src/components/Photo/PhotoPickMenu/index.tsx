import React from 'react';

import * as S from './styles';

interface PhotoPickMenuProps {
  showCamera: () => void;
  showImagePicker: () => Promise<void>;
}

export function PhotoPickMenu({ showCamera, showImagePicker }: PhotoPickMenuProps) {
  const handleShowCamera = async () => {
    showCamera();
  };

  const handleShowImagePicker = async () => {
    await showImagePicker();
  };

  return (
    <S.Container>
      <S.Button
        onPress={() => {
          handleShowCamera();
        }}
      >
        <S.ButtonTitle>Tirar nova foto</S.ButtonTitle>
      </S.Button>
      <S.Divider />
      <S.Button
        onPress={() => {
          handleShowImagePicker();
        }}
      >
        <S.ButtonTitle>Escolher da minha galeria</S.ButtonTitle>
      </S.Button>
    </S.Container>
  );
}
