import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { useAnotherProfile } from '@/modules/Profile/contexts/anotherProfile.contexts';

import { ClosetItem } from '../../components/ClosetItem';
import * as S from './styles';

export function ListClosetByCategoryAnotherUser() {
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
  } = useAnotherProfile();

  const items = isLook
    ? closetLook?.pages.flatMap((page) => page?.result) ?? []
    : closetClothing?.pages.flatMap((page) => page.result) ?? [];

  return (
    <S.Container>
      <S.Content>
        <FlatList
          data={items}
          keyExtractor={(item, index): string => `${item?.id}_${index}`}
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
          renderItem={({ item }) => (
            <ClosetItem item={item} isLook={isLook} hiddenDescription={isLook} />
          )}
          onEndReached={() => {
            if (isLook) {
              if (isFetchingNextPageClosetLook || !hasNextPageClosetLook) return;
              fetchNextPageClosetLook();
              return;
            }

            if (isFetchingNextPageClosetClothing || !hasNextPageClosetClothing) return;
            fetchNextPageClosetClothing();
          }}
          onEndReachedThreshold={1}
        />
        {isFetchingNextPageClosetClothing ? <ActivityIndicator /> : <></>}
      </S.Content>
    </S.Container>
  );
}
