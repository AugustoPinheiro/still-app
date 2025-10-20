import React from 'react';
import { FlatList } from 'react-native';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import MoneyIcon from '@/assets/images/increaseMoneyIcon.svg';
import { Loading } from '@/components/Loading';
import {
  getOffersTransactions,
  getOffersTransactionsBalance,
} from '@/modules/Settings/services/settings.services';

import * as S from './styles';

export function Completed() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['transactionsCompleted'],
    queryFn: async ({ pageParam }) => await getOffersTransactions('completed', pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const datas = React.useMemo(() => {
    return data?.pages?.flatMap((page) => page);
  }, [data]);

  const { data: total } = useQuery({
    queryKey: ['myPiggyBankBalance'],
    queryFn: getOffersTransactionsBalance,
  });

  return (
    <S.Container>
      {isLoading && <Loading hasBackground={false} />}
      <S.HeaderValue>
        <S.HeaderValueText>Oferta recebidas</S.HeaderValueText>
        <S.HeaderValueAmount>
          {total?.balance
            ? Number(total.balance).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })
            : 'R$ 0,00'}
        </S.HeaderValueAmount>
      </S.HeaderValue>

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
          <S.Content>
            <S.LeftContent>
              <S.IconWrapper>
                <MoneyIcon width={20} height={20} />
              </S.IconWrapper>

              <S.NameDataContainer>
                <S.NameText>{item?.offer?.profile?.name}</S.NameText>
                <S.DataText>
                  {item?.created_at
                    ? format(new Date(item?.created_at) ?? '', 'dd/MM/yyyy HH:mm')
                    : ''}
                </S.DataText>
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
