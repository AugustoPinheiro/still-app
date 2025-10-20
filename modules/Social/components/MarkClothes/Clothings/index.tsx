import React, { useCallback } from 'react';
import { RefreshControl } from 'react-native';

import { useInfiniteQuery } from '@tanstack/react-query';

import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { useToast } from '@/contexts/Toast.contexts';
import { useDebounce } from '@/hooks/useDebounce';
import { getClosetClothings } from '@/modules/Closet/services/closet.services';
import { ISelectClothing } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';

import * as S from './styles';

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<ISelectClothing[]>>;
  pos: { x: number; y: number };
};

export function Clothings({ setSelectedItem, pos }: Props) {
  const { show } = useToast();
  const { close } = useBottomSheet();

  const [searchClothing, setSearchClothing] = React.useState('');
  const debounceValueClothing = useDebounce<string>(searchClothing, 600);

  async function fetchClosetClothings({ pageParam }) {
    try {
      const data = await getClosetClothings(searchClothing, undefined, pageParam);

      return data;
    } catch (error) {
      show({
        message: 'Erro ao carregar peças, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const {
    data: clothingsPages,
    isFetching,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['PostClothings', debounceValueClothing],
    queryFn: fetchClosetClothings,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const clothings = React.useMemo(
    () => clothingsPages?.pages?.flatMap((page) => (page?.result ? page?.result : []) ?? []),
    [clothingsPages]
  );

  function handleSelect(item: any) {
    setSelectedItem((prevState) => [...prevState, { ...item, pos }]);
    close();
  }

  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = contentSize.height * 0.5;

    return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (isFetchingNextPage || !hasNextPage || isFetching) return;
        fetchNextPage();
      }
    },
    [isFetchingNextPage, hasNextPage, isFetching]
  );

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container
      onScroll={handleScroll}
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isFetchingNextPage}
          onRefresh={async () =>
            !isFetchingNextPage &&
            !isFetching &&
            (await refetch({ refetchPage: (page, index) => index === 0 }))
          }
        />
      }
    >
      <S.SearchContainer>
        <Search
          placeholder="Busque pela descrição"
          onChangeText={(value) => setSearchClothing(value)}
          value={searchClothing}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </S.SearchContainer>
      {clothings?.length ? (
        <CardsImage
          data={clothings}
          hasTitle={true}
          isSelecting={false}
          onPress={handleSelect}
          isItemSelected={() => false}
          onClickItem={handleSelect}
        />
      ) : (
        <></>
      )}
    </S.Container>
  );
}
