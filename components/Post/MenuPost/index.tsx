import React, { useEffect } from 'react';

import * as Clipboard from 'expo-clipboard';
import * as MediaLibrary from 'expo-media-library';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { SocialPostType } from '@/types/SocialPostType';
import { downloadImage } from '@/utils/downloadImage';

import { MenuReport } from './MenuReport';
import * as S from './styles';

interface IMenuPostProps {
  post: SocialPostType;
}

export function MenuPost({ post }: IMenuPostProps) {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const { close, setBottomSheetProps, expand } = useBottomSheet();
  const { show } = useToast();

  function handleOpenMenuReport() {
    setBottomSheetProps({
      id: 'MenuReport',
      content: <MenuReport post={post} type="post" />,
      snapPoints: ['95%'],
    });
    expand();
  }

  async function handleDownloadImage() {
    if (!permissionResponse?.granted) {
      requestPermission();
      return;
    }

    const urlImage = post.media[0]?.image_url ?? '';

    if (!urlImage) {
      show({
        type: 'error',
        message: 'Não foi possível baixar a imagem',
      });
      return;
    }

    close();
    await downloadImage(urlImage);
    show({
      type: 'success',
      message: 'Imagem baixada com sucesso',
    });
  }

  async function copyToCliboard() {
    const clipped = await Clipboard.setStringAsync(`finti://home/feed/post/${post.id}`);
    if (clipped) {
      show({
        type: 'info',
        message: 'Link copiado!',
        timeout: 1500,
      });
    }

    close();
  }

  useEffect(() => {
    if (permissionResponse?.granted) return;
    requestPermission();
  }, [permissionResponse]);

  return (
    <S.Container>
      <S.Option onPress={handleDownloadImage}>
        <S.OptionText>BAIXAR IMAGEM</S.OptionText>
      </S.Option>

      <S.Option onPress={copyToCliboard}>
        <S.OptionText>COPIAR LINK</S.OptionText>
      </S.Option>

      <S.Option onPress={handleOpenMenuReport}>
        <S.OptionText>DENUNCIAR POSTAGEM</S.OptionText>
      </S.Option>

      <S.Option
        onPress={() => {
          close();
        }}
        noBorder
      >
        <S.OptionText>CANCELAR</S.OptionText>
      </S.Option>
    </S.Container>
  );
}
