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
    const data = await getSocialPostDetails(postId);
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['postDetails', postId],
    queryFn: fetchPostDetails,
    enabled: !!postId,
    retry: 0,
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
      return navigation.goBack();
    } else {
      // @ts-expect-error
      return navigation.navigate('Feed');
    }
  }

  return (
    <S.Container>
      <Post post={data} isDetails />
    </S.Container>
  );
}
