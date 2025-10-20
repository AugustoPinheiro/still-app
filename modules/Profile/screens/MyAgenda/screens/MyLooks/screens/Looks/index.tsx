import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { CardsImage } from '@/components/CardsImage';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { getClosetLooks } from '@/modules/Closet/services/closet.services';
import { ClosetClothingType } from '@/types/ClosetClothingType';
import { ClosetLookType } from '@/types/ClosetLookType';

import * as S from './styles';

type SelectedItemType = {
  clothings: ClosetClothingType[];
  looks: ClosetLookType[];
};

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItemType>>;
  selectedItem: SelectedItemType;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  isSelecting: boolean;
  totalSelectedItems?: number;
};

export function Looks({
  isSelecting,
  selectedItem,
  totalSelectedItems,
  setIsSelecting,
  setSelectedItem,
}: Props) {
  const { show } = useToast();

  async function fetchClosetLooks({ pageParam = undefined }) {
    try {
      const data = await getClosetLooks(undefined, undefined, pageParam);

      return data;
    } catch (error) {
      show({
        message: 'Erro ao carregar looks, tente novamente mais tarde',
        type: 'error',
      });
    }
  }

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['looksAgenda'],
    queryFn: fetchClosetLooks,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const looks = React.useMemo(() => data?.pages.flatMap((page) => page?.result) ?? [], [data]);

  function isItemSelected(item: ClosetLookType) {
    return selectedItem.looks.some((selectedItem) => selectedItem.id === item.id);
  }

  function handleSelect(item: any) {
    if (isSelecting) {
      if (isItemSelected(item)) {
        setSelectedItem((prevState) => ({
          ...prevState,
          looks: prevState.looks.filter((selectedItem) => selectedItem.id !== item.id),
        }));
        return;
      } else {
        setSelectedItem((prevState) => ({ ...prevState, looks: [...prevState.looks, item] }));
      }
      return;
    }

    setIsSelecting(true);

    setSelectedItem((prevState) => ({ ...prevState, looks: [...prevState.looks, item] }));
  }

  const isCloseToBottom = React.useCallback(
    ({ layoutMeasurement, contentOffset, contentSize }: any) => {
      const paddingToBottom = contentSize.height * 0.5;
      return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
    },
    []
  );

  const handleScroll = React.useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (isFetchingNextPage || !hasNextPage) return;
        fetchNextPage();
      }
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      {totalSelectedItems ? (
        <S.CountContainer>
          <S.CountText>
            {totalSelectedItems === 1
              ? '1 peça selecionada'
              : `${totalSelectedItems} peças selecionadas`}
          </S.CountText>
          <S.CountButtonContainer>
            <Button
              title="Cancelar"
              type="primary"
              onPress={() => setSelectedItem({ clothings: [], looks: [] })}
              marginBottom={0}
              weight="flat"
            />
          </S.CountButtonContainer>
        </S.CountContainer>
      ) : (
        <></>
      )}

      {looks?.length ? (
        <CardsImage
          data={looks}
          hasTitle={false}
          isSelecting={isSelecting}
          onPress={handleSelect}
          isItemSelected={isItemSelected}
          onClickItem={handleSelect}
        />
      ) : (
        <></>
      )}
    </S.Container>
  );
}
