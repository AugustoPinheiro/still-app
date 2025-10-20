import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Post } from '@/components/Post';
import { useToast } from '@/contexts/Toast.contexts';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

type PostDetailsRouteProp = {
  origin: {
    post: SocialFeedType;
  };
};

export function PostDiscoveryDetails() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<PostDetailsRouteProp, 'origin'>>();
  const { show } = useToast();
  const post = params?.post;

  if (!post) {
    const message = 'Postagem não encontrada';

    show({
      type: 'error',
      message,
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // @ts-expect-error
      navigation.navigate('Highlight');
    }
  }

  return (
    <S.Wrapper>
      <S.Container>{post ? <Post post={post} /> : <></>}</S.Container>
    </S.Wrapper>
  );
}
