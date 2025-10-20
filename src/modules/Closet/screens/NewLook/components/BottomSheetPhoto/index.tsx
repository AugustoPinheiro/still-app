import React from 'react';

import { Button } from '@/components/Button';

import * as S from './styles';

type BottomSheetPhotoProps = {
  showCamera: () => void;
  showGallery: () => void;
};

export function BottomSheetPhoto({ showCamera, showGallery }: BottomSheetPhotoProps) {
  return (
    <S.Container>
      <S.Title>Experimentou o look? Nos mostre como ficou em você!</S.Title>

      <S.ButtonContainer>
        <Button title="Tirar foto" type="primary" marginBottom={0} onPress={showCamera} />
        <Button
          title="Selecionar da galeria"
          type="secondary"
          marginBottom={0}
          onPress={showGallery}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
