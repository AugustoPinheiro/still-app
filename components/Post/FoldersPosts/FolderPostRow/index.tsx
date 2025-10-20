import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTheme } from 'styled-components/native';

import CommentText from '@/components/Comments/CommentRow/CommentText';
import { useToast } from '@/contexts/Toast.contexts';
import { postSocialSavedPost } from '@/modules/Social/services/social.services';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

import * as S from './styles';

interface IFolderPostRowProps {
  folder: SocialSavedPostFolderType;
  postId: number;
  refetch: () => Promise<void>;
}

export function FolderPostRow({ folder, postId, refetch }: IFolderPostRowProps) {
  const theme = useTheme();
  const { show } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const hasPostAdded = folder?.posts.some((p: any) => p.id === postId);

  const image = folder?.posts[0]?.media[0]?.image_url ?? '';

  const imageEmpty = require('@/assets/images/logo.png');

  async function handleAddPostToFolder() {
    setIsLoading(true);
    try {
      await postSocialSavedPost(folder.folder_id, postId, folder.private);
      await refetch();
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível adicionar o post à pasta';

      show({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function renderButton() {
    if (isLoading) {
      return <S.IconLoading />;
    }

    if (hasPostAdded) {
      return <S.IconMaterial name="check-circle" color={theme.colors.primary_black} />;
    }

    return (
      <TouchableOpacity onPress={handleAddPostToFolder}>
        <S.Icon name="plus-circle" color={theme.colors.primary_black} />
      </TouchableOpacity>
    );
  }

  return (
    <S.Container>
      <S.UserDataContainer>
        <S.FolderPhoto
          source={{ uri: image || imageEmpty }}
          hasImage={!!image}
          contentFit={image ? 'cover' : 'contain'}
          cachePolicy="disk"
        />
        <View>
          <S.AtNameText>{folder.title}</S.AtNameText>
          <CommentText text={folder.private ? 'Privado' : 'Publico'} />
        </View>
        <S.ButtonContainer>{renderButton()}</S.ButtonContainer>
      </S.UserDataContainer>
    </S.Container>
  );
}
