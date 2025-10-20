import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { Post } from '@/components/Post';
import { useToast } from '@/contexts/Toast.contexts';
import { getSocialPostDetails } from '@/modules/Social/services/social.services';

import * as S from './styles';

type PostDetailsRouteProp = {
  origin: {
    postId: number;
  };
};

export function PostDetails() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PostDetailsRouteProp, 'origin'>>();
  const { show } = useToast();
  const postId = params?.postId;

  async function fetchPostDetails() {
    try {
      const data = await getSocialPostDetails(postId);

      return data;
    } catch (error: any) {
      const message = error?.message ?? 'Erro ao carregar postagem';

      show({
        type: 'error',
        message,
      });

      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        // @ts-expect-error
        navigation.navigate('Feed');
      }
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['postDetails', postId],
    queryFn: fetchPostDetails,
  });

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  if (!data && !isLoading) {
    const message = 'Postagem não encontrada';

    show({
      type: 'error',
      message,
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // @ts-expect-error
      navigation.navigate('Feed');
    }
  }

  return <S.Container>{data ? <Post post={data} isDetails /> : <></>}</S.Container>;
}
