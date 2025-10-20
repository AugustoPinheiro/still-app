import React, { useEffect } from 'react';

import MasonryList from '@react-native-seoul/masonry-list';
import { InfiniteData } from '@tanstack/react-query';

import { PostItem } from '@/modules/Profile/components/PostItem';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { PostsListsType } from '@/types/PostsType';

import * as S from './styles';

type PostsProps = {
  posts: InfiniteData<PostsListsType | undefined> | undefined;
  archived?: boolean;
};

export function Posts({ posts, archived }: PostsProps) {
  const { setSelectedTab } = useProfile();
  const parsedPosts = React.useMemo(
    () =>
      posts?.pages
        .flatMap((page) => page.result)
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

  const renderItem = React.useCallback(
    ({ item, i }: any) => (
      <PostItem
        post={item}
        isBigger={i % 6 === 0 || i % 6 === 3 || i % 6 === 4}
        secondAction
        marginAuto={i % 2 === 0}
        archived={archived}
      />
    ),
    []
  );

  useEffect(() => {
    setSelectedTab('posts');
  }, []);

  return (
    <S.Container>
      {!parsedPosts?.length ? (
        <S.EmptyTitle>Você ainda não arquivou nenhuma postagem</S.EmptyTitle>
      ) : (
        <MasonryList
          data={parsedPosts as any}
          keyExtractor={(item): string => `post-${item.id}-${item.description}`}
          onEndReachedThreshold={0.5}
          numColumns={2}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
    </S.Container>
  );
}
