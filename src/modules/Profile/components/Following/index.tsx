import React from 'react';
import { FlatList } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { ProfileType } from '@/types/ProfileType';

import { useProfile } from '../../contexts/profile.contexts';
import { ProfileStackParamList } from '../../routes/profile.types';
import { getMyFollowing, unfollowUser } from '../../services/profile.services';
import * as S from './styles';

export function Following() {
  const { refetchUser } = useProfile();

  const route = useRoute<RouteProp<ProfileStackParamList, 'Follows'>>();

  const {
    data,
    isLoading: isLoadingFollowing,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing,
    isFetchingNextPage: isFetchingNextPageFollowing,
  } = useInfiniteQuery({
    queryKey: ['userFollowing', route.params.username],
    queryFn: async ({ pageParam = undefined }) =>
      await getMyFollowing(route.params.username, pageParam),
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const following = React.useMemo(
    () => data?.pages.flatMap((page) => page?.result) as ProfileType[],
    [data]
  );

  const queryClient = useQueryClient();

  const handleUnfollow = React.useCallback(
    async (username: string) => {
      try {
        await unfollowUser(username);
        queryClient.invalidateQueries({ queryKey: ['userFollowing', route.params.username] });
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
        <S.Button
          onPress={() => {
            handleUnfollow(item?.username ?? '');
          }}
        >
          <S.ButtnoText>Seguindo</S.ButtnoText>
        </S.Button>
      </S.Line>
    ),
    [handleUnfollow]
  );

  if (isLoadingFollowing) {
    return <Loading hasBackground={false} />;
  }

  return (
    <FlatList
      data={following}
      keyExtractor={(item) => `${item?.id ?? item?.username}`}
      onEndReached={() => {
        if (hasNextPageFollowing && !isFetchingNextPageFollowing) {
          fetchNextPageFollowing();
        }
      }}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
}
