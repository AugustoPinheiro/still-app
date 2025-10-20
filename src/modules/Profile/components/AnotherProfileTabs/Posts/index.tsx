import React, { useEffect, useMemo } from 'react';

import MasonryList from '@react-native-seoul/masonry-list';
import { InfiniteData } from '@tanstack/react-query';

import { PostItem } from '@/modules/Profile/components/PostItem';
import { useAnotherProfile } from '@/modules/Profile/contexts/anotherProfile.contexts';
import { PostsListsType } from '@/types/PostsType';

import * as S from './styles';

type PostsProps = {
  posts: InfiniteData<PostsListsType | undefined> | undefined;
};

export function Posts({ posts }: PostsProps) {
  const { setSelectedTab, userData } = useAnotherProfile();
  const filteredPosts = useMemo(
    () =>
      posts?.pages
        .flatMap((page: any) => page?.result)
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

  const renderItem = React.useCallback(({ item, i }: any) => {
    const isBigger = pattern[i % pattern.length];
    return <PostItem post={item} isBigger={isBigger} secondAction marginAuto={i % 2 === 0} />;
  }, []);

  const renderContent = React.useCallback(() => {
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
    } else if (!filteredPosts?.length) {
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
        <MasonryList
          data={filteredPosts as any}
          keyExtractor={(item): string => `post-${item.id}-${item.description}`}
          onEndReachedThreshold={0.5}
          numColumns={2}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      );
    }
  }, [filteredPosts, userData]);

  return <S.Container>{renderContent()}</S.Container>;
}
