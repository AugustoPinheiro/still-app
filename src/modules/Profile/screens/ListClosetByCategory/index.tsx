import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { useProfile } from '@/modules/Profile/contexts/profile.contexts';

import { ClosetItem } from '../../components/ClosetItem';
import * as S from './styles';

export function ListClosetByCategory() {
  const { params } = useRoute<any>();
  const isLook = params?.data?.isLook;

  const {
    closetClothing,
    isFetchingNextPageClosetClothing,
    hasNextPageClosetClothing,
    closetLook,
    isFetchingNextPageClosetLook,
    hasNextPageClosetLook,
    fetchNextPageClosetClothing,
    fetchNextPageClosetLook,
  } = useProfile();

  const items = isLook
    ? closetLook?.pages.flatMap((page) => page?.result) ?? []
    : closetClothing?.pages.flatMap((page) => page.result) ?? [];

  const renderItem = useCallback(
    ({ item }) => <ClosetItem item={item} isLook={isLook} hiddenDescription={isLook} />,
    [isLook]
  );

  return (
    <S.Container>
      <S.Content>
        <FlatList
          data={items}
          keyExtractor={(item): string => `${item.id}`}
          style={{ flex: 1, width: '100%' }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{
            paddingBottom: 80,
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={() => {
            if (isLook) {
              if (isFetchingNextPageClosetLook || !hasNextPageClosetLook) return;
              fetchNextPageClosetLook();
              return;
            }

            if (isFetchingNextPageClosetClothing || !hasNextPageClosetClothing) return;
            fetchNextPageClosetClothing();
          }}
          onEndReachedThreshold={0.5}
        />
        {isFetchingNextPageClosetClothing ? <ActivityIndicator /> : <></>}
      </S.Content>
    </S.Container>
  );
}
