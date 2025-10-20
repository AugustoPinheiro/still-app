import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useSearch } from '@/modules/Search/contexts/search.contexts';

import { SearchStackParamList } from '../../routes/search.types';
import * as S from './styles';
import { SocialProfileType } from '@/types/SocialProfileType';

export function StoreSearch() {
  const navigation = useNavigation<NavigationProp<SearchStackParamList>>();
  const {
    isLoadingStores,
    usersStores,
    searchStores,
    setSearchStore,
    hasNextPageStores,
    fetchNextPageStores,
    isFetchingNextPageStores,
    isFetchingStores,
  } = useSearch();

  function handleNavigateUser(user: SocialProfileType) {
    // @ts-expect-error
    navigation.navigate('Feed', {
      screen: 'AnotherUserProfile',
      params: {
        username: user.username,
        id: user.id,
        from: 'searchStores',
      },
    });
  }

  return (
    <S.Container>
      {isLoadingStores ? (
        <Loading />
      ) : (
        <>
          <S.Content>
            <S.Line>
              <S.ContentInput>
                <Search
                  placeholder="Busque por uma marca"
                  onChangeText={(value) => setSearchStore(value)}
                  value={searchStores}
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
          </S.Content>

          <S.ContainerHighlight>
            <S.Line hasMarginBottom>
              <S.LabelTitle>{searchStores ? 'MARCAS ENCONTRADAS' : 'TODAS AS MARCAS'}</S.LabelTitle>
            </S.Line>
            <FlatList
              data={usersStores}
              extraData={usersStores}
              keyExtractor={(item, index) => `${item?.id}_${index}`}
              contentContainerStyle={{ gap: 24 }}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <S.Line onPress={() => handleNavigateUser(item)}>
                  <S.LabelTitle>{item?.store_profile.name}</S.LabelTitle>
                  <S.UserPhoto source={{ uri: item?.store_profile.avatar }} cachePolicy="disk" />
                </S.Line>
              )}
              ListEmptyComponent={() => (
                <S.Empty>
                  <S.LabelTitle>Nenhuma marca encontrada.</S.LabelTitle>
                </S.Empty>
              )}
              onEndReached={() => {
                if (isFetchingStores || !hasNextPageStores) return;
                fetchNextPageStores();
              }}
            />
          </S.ContainerHighlight>
        </>
      )}
    </S.Container>
  );
}
