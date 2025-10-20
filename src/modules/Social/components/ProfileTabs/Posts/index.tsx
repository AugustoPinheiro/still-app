import React, { useCallback, useEffect } from 'react';

import MansoryList from '@react-native-seoul/masonry-list';
import { InfiniteData } from '@tanstack/react-query';

import { PostItem } from '@/modules/Social/components/PostItem';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { PostsListsType } from '@/types/PostsType';
import { ProfileAnotherUserType } from '@/types/ProfileType';

import * as S from './styles';

type PostsProps = {
  posts: InfiniteData<PostsListsType | undefined> | undefined;
  user?: ProfileAnotherUserType;
};

export function Posts({ posts }: PostsProps) {
  const { setSelectedTab, userData } = useAnotherProfile();

  const parsedPosts = React.useMemo(
    () =>
      posts?.pages
        .flatMap((page: any) => page.result)
        ?.map((post) => ({
          url: post?.media?.length > 0 ? post?.media[0]?.image_url : '',
          user: {
            name: post.profile_name,
            picture: post.avatar,
          },
          description: post.description,
          created_at: '',
          id: post.id.toString(),
        })),
    [posts]
  );

  useEffect(() => {
    setSelectedTab('posts');
  }, []);

  const pattern = [true, false, false, true, true, false, false, true, true, false, false, true];

  const renderPost = useCallback(({ item, i }: any) => {
    const isBigger = pattern[i % pattern.length];

    return (
      <PostItem
        key={`post-${item?.id}`}
        post={item}
        isBigger={isBigger}
        secondAction
        marginAuto={i % 2 === 0}
        hiddenAction
      />
    );
  }, []);

  const renderContent = useCallback(() => {
    if (userData?.private && !userData?.followed) {
      return (
        <>
          <S.EmptyTitle>Essa seção é privada.</S.EmptyTitle>
          <S.EmptyText>
            {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} preferiu privar seus
            posts.
          </S.EmptyText>
        </>
      );
    } else if (!parsedPosts?.length) {
      return (
        <>
          <S.EmptyTitle>
            {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} ainda não fez nenhuma
            postagem
          </S.EmptyTitle>
        </>
      );
    } else {
      return (
        <MansoryList
          data={parsedPosts as any}
          keyExtractor={(item): string => `post-${item?.id}`}
          onEndReachedThreshold={2}
          numColumns={2}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
        />
      );
    }
  }, [parsedPosts, userData]);

  return <S.Container>{renderContent()}</S.Container>;
}
