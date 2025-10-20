import { getUserData } from "@/config/mmkvStorage";
import * as S from './styles';
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getProfileOrders } from "../../services/order.services";
import { useToast } from "@/contexts/Toast.contexts";
import { FlatList, RefreshControl } from "react-native";
import { Loading } from "@/components/Loading";
import { OrderType } from "@/types/OrderType";
import { Tab } from "@/components/Tab";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { Badge } from "@/components/Badge";

export function OrdersList() {
  const { show } = useToast();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [currentTab, setCurrentTab] = React.useState(0);

  const [isLoadingPending, setIsLoadingPending] = React.useState(false);
  let [ordersPending, setOrdersPending] = React.useState<OrderType[]>();

  const [isLoadingClosed, setIsLoadingClosed] = React.useState(false);
  let [ordersClosed, setOrdersClosed] = React.useState<OrderType[]>();

  async function fetchPendingOrders(cursor?: number) {
    setIsLoadingPending(true);
    try {
      const response = await getProfileOrders('pending', cursor);

      setIsLoadingPending(false);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os pagamentos pendentes',
      });
      setIsLoadingPending(false);
      return [];
    }
  }

  async function fetchClosedOrders(cursor?: number) {
    setIsLoadingClosed(true);
    try {
      const response = await getProfileOrders('closed', cursor);

      setIsLoadingClosed(false);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os pagamentos finalizados',
      });
      setIsLoadingClosed(false);
      return [];
    }
  }

  const { 
    data: dataPending, 
    isFetching: isFetchingPending, 
    hasNextPage: hasNextPagePending, 
    fetchNextPage: fetchNextPagePending, 
    refetch: refetchPending 
  } = useInfiniteQuery({
    queryKey: ['pendingOrders'],
    queryFn: fetchPendingOrders,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  ordersPending = React.useMemo(
    () => dataPending?.pages?.flatMap((page: any) => page?.result ?? []) ?? [],
    [dataPending]
  );

  const { 
    data: dataClosed, 
    isFetching: isFetchingClosed, 
    hasNextPage: hasNextPageClosed, 
    fetchNextPage: fetchNextPageClosed, 
    refetch: refetchClosed 
  } = useInfiniteQuery({
    queryKey: ['closedOrders'],
    queryFn: fetchClosedOrders,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  ordersClosed = React.useMemo(
    () => dataClosed?.pages?.flatMap((page: any) => page?.result ?? []) ?? [],
    [dataClosed]
  );

  useEffect(()=>{
    if (isFocused) {
      refetchPending();
      refetchClosed();
    }
   },[isFocused])

  const pendingOrders = () => {
    if (isLoadingPending || isFetchingPending || isLoadingClosed || isFetchingClosed) {
      return (<Loading />);
    }
  
    return (
      <S.Content>
        <FlatList
          numColumns={1}
          data={ordersPending}
          extraData={ordersPending}
          keyExtractor={(item: OrderType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={<RefreshControl refreshing={isFetchingPending} onRefresh={refetchPending} />}
          renderItem={({ item, index }) => (
            <S.Card key={item.id}>
              <S.CardTop>
                <S.Title>{item.service_schedule[0].service.title}</S.Title>
                <S.CardText>@{item.service_schedule[0].service.profile?.username}</S.CardText>
                <S.CardText>
                {item?.amount
                  ? Number(item.amount / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
                </S.CardText>
              </S.CardTop>
              {item.pagarme_order_id == 'to_process' ? 
                (
                  <S.CardButtons>
                    <S.CardButton title="Pagar agora" onPress={async () => handleNavigatePayOrder(item)} />
                  </S.CardButtons>
                ) : (<></>)
              }
            </S.Card>
          )}
          ListEmptyComponent={
            <S.ContainerEmpty>
              <S.EmptyTitle>Nenhum pagamento pendente.</S.EmptyTitle>
            </S.ContainerEmpty>
          }
          onEndReached={() => {
            // if (isFetchingPending || !hasNextPagePending) return;
            // fetchNextPagePending();
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Content>
    );
  }

  const closedOrders = () => {
    if (isLoadingClosed || isFetchingClosed) {
      return (<Loading />);
    }
    return (
      <S.Content>
        <FlatList
          numColumns={1}
          data={ordersClosed}
          extraData={ordersClosed}
          keyExtractor={(item: OrderType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={<RefreshControl refreshing={isFetchingClosed} onRefresh={refetchClosed} />}
          renderItem={({ item, index }) => (
            <S.Card key={item.id}>
              <S.CardTop>
                <S.CardTopRow>
                  <S.Title>{item.service_schedule[0].service.title}</S.Title>
                  {item.status == 'paid'
                    ? <Badge title={'Pago'} type="success"></Badge>
                    : item.status == 'canceled' || item.status == 'failed'
                      ? <Badge title={item.status == 'canceled' ? 'Cancelado' : 'Falhou'} type="danger"></Badge>
                      : <Badge title={'Pendente'} type="tertiary"></Badge>
                  }
                </S.CardTopRow>
                <S.CardText>@{item.service_schedule[0].service.profile?.username}</S.CardText>
                <S.CardText>
                {item?.amount
                  ? Number(item.amount / 100).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
                </S.CardText>
              </S.CardTop>
            </S.Card>
          )}
          ListEmptyComponent={
            <S.ContainerEmpty>
              <S.EmptyTitle>Você ainda não efetuou nenhum pagamento.</S.EmptyTitle>
            </S.ContainerEmpty>
          }
          onEndReached={() => {
            // if (isFetchingPending || !hasNextPagePending) return;
            // fetchNextPagePending();
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Content>
    );
  }

  function handleNavigatePayOrder(order: OrderType) {
    navigation.navigate('PayOrder', order);
  }

  const renderTabs = () => {
    return [{
        title: 'Em aberto',
        component: pendingOrders(),
        ref: React.createRef(),
      },
      {
        title: 'Finalizados',
        component: closedOrders(),
        ref: React.createRef(),
      }] as any[];
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.TabContainer>
          <Tab
            key={currentTab}
            activiteTab={currentTab}
            onTabChange={setCurrentTab}
            tabs={renderTabs()}
            offset={50}
          />
        </S.TabContainer>
      </S.Container>
    </S.Wrapper>
  )
}