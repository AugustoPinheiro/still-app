import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { HighlightList } from '@/modules/Search/components/HighlightList';
import { useSearch } from '@/modules/Search/contexts/search.contexts';

import { SearchStackParamList } from '../../routes/search.types';
import { UserItem } from '../UserItem';
import * as S from './styles';

export function PersonSearch() {
  const navigation = useNavigation<NavigationProp<SearchStackParamList>>();
  const {
    isLoading,
    users,
    search,
    setSearch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    highlights,
  } = useSearch();

  const handleNavigateListPersons = () => navigation.navigate('ListPersons');

  const fetchNextPageData = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.Content>
        <S.Line>
          <S.ContentInput>
            <Search
              placeholder="Busque pela descrição"
              onChangeText={(value) => setSearch(value)}
              value={search}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              width="100%"
            />
          </S.ContentInput>
          {/* <S.FilterButton onPress={handleFilters}>
              <FilterIcon />
            </S.FilterButton> */}
        </S.Line>

        <S.ContainerSuggest>
          <S.Line>
            <S.LabelTitle>{search ? 'PERFIS ENCONTRADOS' : 'PERFIS SUGERIDOS'}</S.LabelTitle>
            {users && users?.length > 3 ? (
              <TouchableOpacity onPress={handleNavigateListPersons}>
                <S.Label>Ver todos</S.Label>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </S.Line>
          <S.LineUser hasMarginTop>
            <FlatList
              data={users}
              keyExtractor={(item, index) => `${item?.id}_${index}`}
              renderItem={({ item }) => <UserItem user={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 24 }}
              ListEmptyComponent={() => <S.Label>Nenhum perfil encontrado</S.Label>}
              onEndReached={fetchNextPageData}
              refreshing={isFetchingNextPage}
            />
          </S.LineUser>
        </S.ContainerSuggest>
      </S.Content>

      <S.ContainerHighlight>
        <S.Line>
          <S.LabelTitle>DESTAQUES</S.LabelTitle>
        </S.Line>
        <HighlightList highlights={highlights.slice(0, 16)} />
      </S.ContainerHighlight>
    </S.Container>
  );
}
