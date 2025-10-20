import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { useSearch } from '@/modules/Search/contexts/search.contexts';

import { UserItem } from '../../components/UserItem';
import * as S from './styles';

export function ListPersons() {
  const { users, isFetchingNextPage, hasNextPage, fetchNextPage } = useSearch();

  const fetchNextPageData = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <S.Container>
      <S.Content>
        <FlatList
          data={users}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          renderItem={({ item }) => <UserItem user={item} />}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-evenly', gap: 24 }}
          contentContainerStyle={{ gap: 24 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <S.Label>Nenhum perfil encontrado</S.Label>}
          onEndReached={fetchNextPageData}
          refreshing={isFetchingNextPage}
          decelerationRate="fast"
        />
      </S.Content>
    </S.Container>
  );
}
