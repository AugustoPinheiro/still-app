import React from 'react';
import { FlatList } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { ProfileType } from '@/types/ProfileType';

import { useProfile } from '../../contexts/profile.contexts';
import { ProfileStackParamList } from '../../routes/profile.types';
import { getMyFollowers, removerFollowUser } from '../../services/profile.services';
import * as S from './styles';

export function Followers() {
  const { refetchUser } = useProfile();

  const route = useRoute<RouteProp<ProfileStackParamList, 'Follows'>>();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['userFollowers', route.params.username],
    queryFn: async ({ pageParam = undefined }) =>
      await getMyFollowers(route.params.username, pageParam),
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const followersData = React.useMemo(
    () => data?.pages.flatMap((page) => page?.result) as ProfileType[],
    [data]
  );

  const queryClient = useQueryClient();

  const handleRemoveFollow = React.useCallback(
    async (username: string) => {
      try {
        await removerFollowUser(username);
        queryClient.invalidateQueries({ queryKey: ['userFollowers', route.params.username] });
        refetchUser();
      } catch (er) {
        console.error(er);
      }
    },
    [queryClient]
  );

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <S.Line>
        <S.Photo source={{ uri: item?.avatar }} cachePolicy="disk" />
        <S.LabelName>{item?.name}</S.LabelName>
        <S.Button onPress={async () => await handleRemoveFollow(item.username)}>
          <S.ButtnoText>Remover</S.ButtnoText>
        </S.Button>
      </S.Line>
    ),
    [handleRemoveFollow]
  );

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <FlatList
      data={followersData}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={5}
      keyExtractor={(item) => `${item?.id ?? item?.username}`}
      renderItem={renderItem}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
}
