import React from 'react';
import { ActivityIndicator } from 'react-native';

import MasonryList from '@react-native-seoul/masonry-list';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { Tab } from '@/components/Tab';
import {
  getMyFollowers,
  getMyFollowing,
  removerFollowUser,
  unfollowUser,
} from '@/modules/Profile/services/profile.services';
import { ProfileType } from '@/types/ProfileType';

import { ProfileStackParamList } from '../../routes/profile.types';
import * as S from './styles';

export function Follows() {
  const navigation = useNavigation<any>();
  const [isFollowersLoading, setIsFollowersLoading] = React.useState<string[]>([]);
  const [isFollowingLoading, setIsFollowingLoading] = React.useState<string[]>([]);

  const route = useRoute<RouteProp<ProfileStackParamList, 'Follows'>>();

  const activeTab = route.params?.activeTab ?? 0;

  const {
    data: followers,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['userFollowers', route.params.username],
    queryFn: async ({ pageParam = undefined }) =>
      await getMyFollowers(route.params.username, pageParam),
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const {
    data: followings,
    isLoading: isLoadingFollowing,
    refetch: refetchFollowing,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing,
    isFetchingNextPage: isFetchingNextPageFollowing,
  } = useInfiniteQuery({
    queryKey: ['userFollowing', route.params.username],
    queryFn: async ({ pageParam = undefined }) =>
      await getMyFollowing(route.params.username, pageParam),
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const followersData = React.useMemo(
    () => followers?.pages.flatMap((page) => page?.result) as ProfileType[],
    [followers]
  );
  const followingData = React.useMemo(
    () => followings?.pages.flatMap((page) => page?.result) as ProfileType[],
    [followings]
  );

  const queryClient = useQueryClient();

  const handleRemoveFollow = React.useCallback(
    async (username: string) => {
      try {
        setIsFollowersLoading((prev) => [...prev, username]);
        await removerFollowUser(username);
        await refetch();
      } catch (er) {
        console.error(er);
      } finally {
        setIsFollowersLoading((prev) => prev.filter((item) => item !== username));
      }
    },
    [route.params.username, queryClient]
  );

  const handleUnfollow = async (username: string) => {
    try {
      setIsFollowingLoading((prev) => [...prev, username]);
      await unfollowUser(username);
      await refetchFollowing();
    } catch (er) {
      console.error(er);
    } finally {
      setIsFollowingLoading((prev) => prev.filter((item) => item !== username));
    }
  };

  function handleNavigateUser(item: ProfileType) {
    navigation.navigate('AnotherUser', {
      username: item.username,
      id: item.profile_id,
    });
  }

  const renderFollowers = React.useCallback(
    ({ item }: any) => (
      <S.Line>
        <S.TouchToProfile onPress={() => handleNavigateUser(item)}>
          <S.Photo source={{ uri: item?.avatar }} cachePolicy="disk" />
          <S.LabelName>{item?.username}</S.LabelName>
        </S.TouchToProfile>
        <S.Button
          disabled={isFollowersLoading.includes(item.username)}
          onPress={async () => await handleRemoveFollow(item.username)}
        >
          {isFollowersLoading.includes(item.username) ? (
            <S.ButtonLoading>
              <ActivityIndicator size="small" />
            </S.ButtonLoading>
          ) : (
            <S.ButtnoText>Remover</S.ButtnoText>
          )}
        </S.Button>
      </S.Line>
    ),
    [isFollowersLoading]
  );

  const renderFollowing = React.useCallback(
    ({ item }: any) => (
      <S.Line>
        <S.TouchToProfile onPress={() => handleNavigateUser(item)}>
          <S.Photo source={{ uri: item?.avatar }} cachePolicy="disk" />
          <S.LabelName>{item?.username}</S.LabelName>
        </S.TouchToProfile>
        <S.Button
          onPress={() => {
            handleUnfollow(item?.username ?? '');
          }}
        >
          {isFollowingLoading.includes(item.username) ? (
            <S.ButtonLoading2>
              <ActivityIndicator size="small" />
            </S.ButtonLoading2>
          ) : (
            <S.ButtnoText>Deixar de seguir</S.ButtnoText>
          )}
        </S.Button>
      </S.Line>
    ),
    [isFollowingLoading]
  );

  if (isLoading || isLoadingFollowing) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <S.TabContainer>
        <Tab
          activiteTab={activeTab}
          tabs={
            [
              {
                title: 'Seguidores',
                component: (
                  <MasonryList
                    data={followersData}
                    numColumns={1}
                    onEndReached={() => {
                      if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                      }
                    }}
                    keyExtractor={(item) => `follower-${item?.id}-${item?.username}`}
                    renderItem={renderFollowers}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    onEndReachedThreshold={2}
                  />
                ),
                ref: React.createRef(),
              },
              {
                title: 'Seguindo',
                component: (
                  <MasonryList
                    data={followingData}
                    numColumns={1}
                    keyExtractor={(item) => `following-${item?.id}-${item?.username}`}
                    onEndReached={() => {
                      if (hasNextPageFollowing && !isFetchingNextPageFollowing) {
                        fetchNextPageFollowing();
                      }
                    }}
                    renderItem={renderFollowing}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    onEndReachedThreshold={2}
                  />
                ),
                ref: React.createRef(),
              },
            ] as any
          }
          offset={33}
        />
      </S.TabContainer>
    </S.Container>
  );
}
