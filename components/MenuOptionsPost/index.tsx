import React from 'react';
import { Share } from 'react-native';

import { FoldersPosts } from '@/components/Post/FoldersPosts';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import * as S from './styles';

type MenuOptionsPostProps = {
  post: any;
};

export function MenuOptionsPost({ post }: MenuOptionsPostProps) {
  const { close, setBottomSheetProps, expand } = useBottomSheet();

  function handleOpenSavePost() {
    setBottomSheetProps({
      id: 'FoldersPosts',
      content: <FoldersPosts post={post} />,
      snapPoints: ['95%'],
    });
    expand();
  }

  const shareFunc = async () => {
    try {
      const result = await Share.share({
        message: post.description?.slice(0, 20),
        url: `finti://home/feed/post/${post.id}`,
                title: 'Still',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Container>
      <S.Button onPress={handleOpenSavePost}>
        <S.ButtonTitle>Salvar Post</S.ButtonTitle>
      </S.Button>

      <S.Divider />

      <S.Button onPress={shareFunc}>
        <S.ButtonTitle>Compartilhar</S.ButtonTitle>
      </S.Button>

      <S.Divider />

      <S.Button onPress={close}>
        <S.ButtonTitle>Cancelar</S.ButtonTitle>
      </S.Button>
    </S.Container>
  );
}
