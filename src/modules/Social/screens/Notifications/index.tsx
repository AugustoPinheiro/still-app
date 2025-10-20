import React, { useEffect } from 'react';
import { ActivityIndicator, RefreshControl, SectionList } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { isToday, isAfter, subDays } from 'date-fns';

import { Loading } from '@/components/Loading';
import { NotificationsRow } from '@/modules/Social/components/NotificationsRow';
import { useSocial } from '@/modules/Social/contexts/social.contexts';
import {
  getSocialNotifications,
  readNotifications,
} from '@/modules/Social/services/social.services';

import * as S from './styles';

export function Notifications() {
  const navigation = useNavigation<any>();
  const { followRequests, refetchFollowRequests } = useSocial();
  const { data, isLoading, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      queryFn: getSocialNotifications,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

  const notifications = React.useMemo(
    () => data?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [data]
  );

  const newNotifications = notifications
    ?.filter((item: any) => !item?.seen)
    ?.map((item: any) => item?.id);

  function refetchAll() {
    refetch();
    refetchFollowRequests();
  }

  useFocusEffect(
    React.useCallback(() => {
      refetchAll();
    }, [])
  );

  useEffect(() => {
    if (newNotifications?.length) {
      readNotifications(newNotifications);
    }
  }, [newNotifications]);

  const sectionData = React.useMemo(() => {
    const section = [];

    if (notifications?.length) {
      const today = [];
      const thisWeek = [];
      const olds = [];
      const week = subDays(new Date(), 7);

      for (const item of notifications) {
        if (isToday(new Date(item?.created_at))) {
          today.push(item);
          continue;
        }
        if (isAfter(new Date(item?.created_at), week)) {
          thisWeek.push(item);
          continue;
        } else {
          olds.push(item);
        }
      }

      if (today?.length) {
        section.push({
          title: 'Hoje',
          data: today,
          renderItem: ({ item }) => <NotificationsRow notification={item} />,
          keyExtractor: (item, index) => `${item.id}_${index}`,
        });
      }

      if (thisWeek?.length) {
        section.push({
          title: 'Essa semana',
          data: thisWeek,
          renderItem: ({ item }) => <NotificationsRow notification={item} />,
          keyExtractor: (item, index) => `${item.id}_${index}`,
        });
      }

      if (olds?.length) {
        section.push({
          title: 'Anteriormente',
          data: olds,
          renderItem: ({ item }) => <NotificationsRow notification={item} />,
          keyExtractor: (item, index) => `${item.id}_${index}`,
        });
      }
    }

    return section;
  }, [notifications]);

  const getFollowRequestsText = React.useCallback(() => {
    if (followRequests?.length === 1) {
      return followRequests[0].username;
    }

    if (followRequests?.length === 2) {
      return `${followRequests[0].username} e ${followRequests[1].username}`;
    }

    return `${followRequests[0].username} + ${followRequests.length - 1} outros`;
  }, [followRequests]);

  const renderFollowRequests = React.useCallback(() => {
    if (!followRequests?.length) {
      return <></>;
    }

    return (
      <S.FollowRequestContainer onPress={() => navigation.navigate('FollowRequests')}>
        <S.RowContainer>
          <>
            <S.UserPhoto source={{ uri: followRequests[0]?.avatar }} cachePolicy="disk" />
            <S.TextContainer>
              <S.FollowNameText>Solicitações para seguir</S.FollowNameText>
              <S.FollowDescription>{getFollowRequestsText()}</S.FollowDescription>
            </S.TextContainer>
          </>
          <S.Icon name="chevron-right" />
        </S.RowContainer>
      </S.FollowRequestContainer>
    );
  }, [followRequests, navigation]);

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {!isLoading && !notifications?.length ? (
        <S.EmptyContainer>
          <S.Title>Você não possui notificações</S.Title>
        </S.EmptyContainer>
      ) : (
        <S.Content>
          <SectionList
            renderSectionHeader={({ section: { title } }) => <S.Description>{title}</S.Description>}
            initialNumToRender={20}
            sections={(sectionData ?? []) as any}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetchAll} />}
            onEndReached={async () => {
              if (hasNextPage && !isFetchingNextPage && !isLoading) {
                await fetchNextPage();
              }
            }}
            onEndReachedThreshold={1}
            ListHeaderComponent={renderFollowRequests}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#000" style={{ marginBottom: 8 }} />
              ) : (
                <></>
              )
            }
          />
        </S.Content>
      )}
    </S.Container>
  );
}
