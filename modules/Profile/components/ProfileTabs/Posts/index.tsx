import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import MasonryList from '@react-native-seoul/masonry-list';
import { InfiniteData } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { PostItem } from '@/modules/Profile/components/PostItem';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { PostsListsType } from '@/types/PostsType';

import * as S from './styles';

type PostsProps = {
  posts: InfiniteData<PostsListsType | undefined> | undefined;
};

export function Posts({ posts }: PostsProps) {
  const { setSelectedTab, isLoadingPosts, refetchPosts, isFetchingNextPagePosts } = useProfile();
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
    refetchPosts();
  }, []);

  const pattern = [true, false, false, true, true, false, false, true, true, false, false, true];

  const renderItem = React.useCallback(({ item, i }: any) => {
    const isBigger = pattern[i % pattern.length];
    return <PostItem post={item} isBigger={isBigger} secondAction marginAuto={i % 2 === 0} />;
  }, []);

  if (isLoadingPosts) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {!parsedPosts?.length ? (
        <>
          <S.EmptyTitle>Você ainda não fez nenhuma postagem</S.EmptyTitle>
          <S.EmptyText>
            Crie sua primeira postagem e compartilhe os seus melhores looks!
          </S.EmptyText>
        </>
      ) : (
        <MasonryList
          data={parsedPosts as any}
          keyExtractor={(item): string => `post-${item?.id}-${item?.description}`}
          onEndReachedThreshold={2}
          numColumns={2}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={isFetchingNextPagePosts ? <ActivityIndicator /> : <></>}
        />
      )}
    </S.Container>
  );
}
