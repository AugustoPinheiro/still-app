import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getOffersByStatus } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

export function Accepted() {
  const navigation = useNavigation<any>();

  const { data, refetch, isFetching, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['offersAccepted'],
      queryFn: async ({ pageParam }) => await getOffersByStatus('accepted', pageParam, true),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

  const offers = React.useMemo(() => {
    return data?.pages?.flatMap((page) => {
      return page;
    });
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <S.Container>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        style={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // Linking.openURL(`finti://offers/${item?.id}/${item?.post_id}/true`);
              navigation.navigate('MyOffersDetailsDone', {
                offerId: item?.id,
                postId: item?.post_id,
                status: item?.status,
                clothings: item?.clothing_list?.map((clothing) => clothing?.id),
              });
            }}
          >
            <S.ImageContainer source={{ uri: item?.image }} cachePolicy="disk" />
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        onEndReached={() => {
          if (!hasNextPage || isFetching || isLoading || isFetchingNextPage) return;
          fetchNextPage();
        }}
      />
    </S.Container>
  );
}
