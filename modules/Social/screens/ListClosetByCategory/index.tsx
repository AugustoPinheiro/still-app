import React from 'react';
import { FlatList } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';

import { ClosetItem } from '../../components/ClosetItem';
import * as S from './styles';

export function ListClosetByCategory() {
  const { isLoading } = useQuery({
    queryKey: ['profilebyUsername'],
    queryFn: getProfileByUsername,
  });

  const {
    closetClothing,
    isFetchingNextPageClosetClothing,
    hasNextPageClosetClothing,
    fetchNextPageClosetClothing,
  } = useAnotherProfile();

  const clothings = React.useMemo(
    () => closetClothing?.pages.flatMap((page) => page.result) ?? [],
    [closetClothing]
  );

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <S.Content>
        <FlatList
          data={clothings}
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
          renderItem={({ item }) => <ClosetItem item={item} />}
          onEndReached={() => {
            if (isFetchingNextPageClosetClothing || !hasNextPageClosetClothing) return;
            fetchNextPageClosetClothing();
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={
            isFetchingNextPageClosetClothing ? <Loading hasBackground={false} /> : <></>
          }
        />
      </S.Content>
    </S.Container>
  );
}
