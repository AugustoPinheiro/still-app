import React, { useCallback, useEffect } from 'react';

import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

import { PostSavedItem } from '@/components/PostSavedItem';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { ProfileAnotherUserType } from '@/types/ProfileType';
import { SocialSavedPostFolderType } from '@/types/SocialSavedPostFolder';

import * as S from './styles';

type PostsSavesProps = {
  postsSaved: SocialSavedPostFolderType[] | undefined;
  user?: ProfileAnotherUserType;
};

export function Saves({ postsSaved }: PostsSavesProps) {
  const { setSelectedTab, userData } = useAnotherProfile();
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
  }, []);

  const renderItem = useCallback(
    ({ item, i }: any) => (
      <PostSavedItem
        onPress={() => navigation.navigate('SocialListSaves', { data: item })}
        description={item.description}
        items={item.items}
        images={item.images}
        marginAuto={i % 2 === 0}
      />
    ),
    []
  );

  const showContent = useCallback(() => {
    if ((userData?.private && !userData?.followed) || userData?.private_favorites) {
      return (
        <>
          <S.EmptyTitle>Essa seção é privada.</S.EmptyTitle>
          <S.EmptyText>
            {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} preferiu privar seus
            salvos.
          </S.EmptyText>
        </>
      );
    } else if (!postsSaved?.length) {
      return (
        <S.EmptyTitle>
          {[userData?.name?.trim(), userData?.last_name?.trim()].join(' ')} ainda não possui itens
          salvos
        </S.EmptyTitle>
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
