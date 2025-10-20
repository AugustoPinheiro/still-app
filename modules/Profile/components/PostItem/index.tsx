import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ThreeDotsIcon from '@/assets/images/threeDotsBlack.svg';
import { Loading } from '@/components/Loading';
import { MenuOptionsPost } from '@/components/MenuOptionsPost';
import { MenuOptionsPostLoggedUser } from '@/components/MenuOptionsPostLoggedUser';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import {
  archivePostById,
  deletePostById,
  unarchivePostById,
} from '@/modules/Social/services/anotherpersonprofile.services';

import * as S from './styles';

export interface PostItemProps {
  post: {
    url: string;
    user: {
      name: string;
      picture: string;
    };
    description: string;
    created_at: string;
    id: string;
  };
  isBigger?: boolean;
  hiddenAction?: boolean;
  secondAction?: boolean;
  marginAuto?: boolean;
  archived?: boolean;
}

export function PostItem({
  post,
  isBigger,
  hiddenAction,
  marginAuto,
  secondAction,
  archived,
}: PostItemProps) {
  const { expand, setBottomSheetProps, close } = useBottomSheet();
  const navigation = useNavigation();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const { refetchPosts, refetchArchivedPosts } = useProfile();

  const handleArchive = async () => {
    try {
      setLoading(true);
      await archivePostById(post.id);
      show({
        message: 'Post arquivado.',
        type: 'info',
      });
      close();
      await refetchPosts();
      refetchArchivedPosts();
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async () => {
    setLoading(true);
    await unarchivePostById(post.id);
    show({
      message: 'Post desarquivado.',
      type: 'info',
    });
    close();
    refetchPosts();
    await refetchArchivedPosts();
    setLoading(false);
  };

  const handleDelete = async () => {
    Alert.alert(
      `Excluir ${post.description}`,
      `Tem certeza que deseja excluir ${post.description}?`,
      [
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => {
            close();
          },
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              setLoading(true);
              await deletePostById(post.id, archived);
              refetchPosts();
              refetchArchivedPosts();
              show({
                message: `${post.description} excluído com sucesso`,
                type: 'success',
              });
              close();
            } catch (error) {
              show({
                message: `Erro ao excluír, tente novamente mais tarde`,
                type: 'error',
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
    refetchPosts({ refetchPage: (lastPage, index) => index === 0 });
  };

  const handleOptions = () => {
    if (secondAction) {
      setBottomSheetProps({
        id: 'MenuOptionsPostLoggedUser',
        content: (
          <MenuOptionsPostLoggedUser
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleUnarchive={handleUnarchive}
            archived={archived}
          />
        ),
        snapPoints: [180],
      });
    } else {
      setBottomSheetProps({
        id: 'MenuOptionsPost',
        content: <MenuOptionsPost />,
        snapPoints: [270],
      });
    }
    expand();
  };

  const navigatePost = () => {
    if (archived) return;

    navigation.navigate('ProfilePostDetails', { postId: post.id });
  };

  if (loading) return <Loading />;

  return (
    <S.Container marginAuto={marginAuto}>
      <TouchableOpacity onPress={navigatePost} activeOpacity={archived ? 1 : 0.7}>
        <S.UserPhoto
          source={{ uri: post.url }}
          isBigger={isBigger}
          contentFit="cover"
          cachePolicy="disk"
        />
      </TouchableOpacity>
      <S.Line>
        <S.LabelTitle numberOfLines={1} ellipsizeMode="tail">
          {post.description?.trim()}
        </S.LabelTitle>
        {hiddenAction ? null : (
          <S.ButtonOptions onPress={handleOptions}>
            <ThreeDotsIcon />
          </S.ButtonOptions>
        )}
      </S.Line>
    </S.Container>
  );
}
