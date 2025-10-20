import React, { useCallback, useEffect } from 'react';

import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

import { PostSavedItem } from '@/components/PostSavedItem';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

import * as S from './styles';

type PostsSavesProps = {
  postsSaved: SocialSavedPostFolderType[] | undefined;
};

export function Saves({ postsSaved }: PostsSavesProps) {
  const { setSelectedTab, refetchPostsSaved } = useProfile();
  const navigation = useNavigation<any>();
  const filterPostsSaved = React.useMemo(
    () =>
      postsSaved
        ?.filter((post) => post?.item_count > 0)
        ?.map((post) => ({
          images: post?.posts?.flatMap((post) => post.media.flatMap((media) => media.image_url)),
          description: post.title,
          created_at: '',
          id: `${post.folder_id}`,
          items: post.posts?.length,
        })),
    [postsSaved]
  );

  useEffect(() => {
    setSelectedTab('saved');
    refetchPostsSaved();
  }, []);

  const renderItem = useCallback(
    ({ item, i }: any) => (
      <PostSavedItem
        onPress={() => navigation.navigate('ProfileListSaves', { data: item })}
        description={item.description}
        items={item.items}
        images={item.images}
        marginAuto={i % 2 === 0}
      />
    ),
    []
  );

  const showContent = useCallback(() => {
    if (!filterPostsSaved?.length) {
      return (
        <>
          <S.EmptyTitle>Você ainda não possui itens salvos</S.EmptyTitle>
          <S.EmptyText>Salve as inspirações e peças que você gostou!</S.EmptyText>
        </>
      );
    } else {
      return (
        <MasonryList
          data={filterPostsSaved as any}
          keyExtractor={(item): string => item.id}
          numColumns={2}
          contentContainerStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      );
    }
  }, [filterPostsSaved]);

  return <S.Container>{showContent()}</S.Container>;
}
