import React, { useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import { Button } from '@/components/Button';
import { getInspirationsUpload, setInspirationsUpload, storage } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { postInspirations } from '@/modules/Closet/services/closet.services';

import * as S from './styles';

export function InspirationsEmpty() {
  // const [permissionGalleryResponse, requestPermissionGallery] =
  //   ImagePicker.useMediaLibraryPermissions();
  const { show } = useToast();
  const [localInspirationsUpload, setLocalInspirationsUpload] = useState(getInspirationsUpload());

  const { refetchInspirations } = useCloset();

  useEffect(() => {
    const listenerStorage = storage.addOnValueChangedListener((key) => {
      if (key === 'inspirationsUpload') {
        const data = storage.getString('inspirationsUpload');

        if (!data) return;

        setLocalInspirationsUpload(JSON.parse(data));
      }
    });

    return () => {
      listenerStorage.remove();
    };
  }, []);

  // async function requestPermissionGalleryRetry() {
  //   await requestPermissionGallery();

  //   if (!permissionGalleryResponse?.granted) {
  //     show({
  //       type: 'error',
  //       message: 'Precisamos da sua permissão para acessar a galeria',
  //     });

  //     await requestPermissionGallery();
  //   }
  // }

  async function showImagePicker() {
    try {
      // await requestPermissionGalleryRetry();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.5,
        aspect: [4, 3],
      });

      if (!result?.canceled) {
        await postInspirations(result.assets);
        await refetchInspirations();
      }
    } catch (err) {
      show({
        type: 'error',
        message: 'Não foi possível enviar as inspirações, tente novamente mais tarde.',
      });
      setInspirationsUpload({ total: 0, uploaded: 0 });
    } finally {
      setTimeout(() => {
        setInspirationsUpload({ total: 0, uploaded: 0 });
      }, 5000);
    }
  }

  return (
    <S.ContainerEmpty>
      <S.EmptyTitle>Ainda não há inspirações por aqui.</S.EmptyTitle>
      <S.EmptyText>
        Dê vida ao seu estilo! Traga suas fotos e vídeos para inspirar novas combinações de looks.
      </S.EmptyText>

      <S.ButtonContainerEmpty>
        <Button
          title="Subir inspirações"
          onPress={showImagePicker}
          disabled={localInspirationsUpload.total > 0}
        />
      </S.ButtonContainerEmpty>
    </S.ContainerEmpty>
  );
}
