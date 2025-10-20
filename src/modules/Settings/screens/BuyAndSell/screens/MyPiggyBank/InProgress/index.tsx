import React from 'react';
import { FlatList } from 'react-native';

import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import MoneyIcon from '@/assets/images/increaseMoneyIcon.svg';
import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { ModalEdit } from '@/modules/Settings/screens/BuyAndSell/screens/MyPiggyBank/InProgress/modalEdit';
import { getOffersTransactions } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

export function InProgress() {
  const { expand, setBottomSheetProps } = useBottomSheet();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['transactionsInProgress'],
    queryFn: async ({ pageParam }) => await getOffersTransactions('pending', pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const [datas, setDatas] = React.useState(
    React.useMemo(() => {
      return data?.pages?.flatMap((page) => page);
    }, [data])
  );

  function handleUpdateValue(offerId: number, newValue: number) {
    const offerIndex = datas?.findIndex((item) => item?.offer?.id === offerId);

    if (offerIndex === -1 || offerIndex === undefined || !datas) return;

    datas[offerIndex].offer.value = newValue;
    setDatas([...datas]);
  }

  function handleEditValue(offer: any) {
    setBottomSheetProps({
      snapPoints: [540],
      id: 'myPiggyBankInProgress',
      content: <ModalEdit offer={offer} handleUpdateValue={handleUpdateValue} />,
    });

    expand();
  }

  return (
    <S.Container>
      {isLoading && <Loading hasBackground={false} />}
      <S.Title>Extrato</S.Title>
      <FlatList
        data={datas}
        keyExtractor={(item) => String(item?.offer?.id)}
        onEndReached={() => {
          if (isLoading || isFetchingNextPage || !hasNextPage) return;

          fetchNextPage();
        }}
        ListEmptyComponent={() => (
          <S.EmptyListContainer>
            <S.NameText>Nenhum lançamento</S.NameText>
          </S.EmptyListContainer>
        )}
        renderItem={({ item }) => (
          <S.Content onPress={() => handleEditValue(item)}>
            <S.LeftContent>
              <S.IconWrapper>
                <MoneyIcon width={20} height={20} />
              </S.IconWrapper>

              <S.NameDataContainer>
                <S.NameText>{item?.offer?.profile?.name}</S.NameText>
                <S.DataText>{format(new Date(item?.created_at), 'dd/MM/yyyy HH:mm')}</S.DataText>
              </S.NameDataContainer>
            </S.LeftContent>

            <S.ValueText>
              {Number(item?.offer?.value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </S.ValueText>
          </S.Content>
        )}
      />
    </S.Container>
  );
}
