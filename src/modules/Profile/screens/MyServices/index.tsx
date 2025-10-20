import { useToast } from "@/contexts/Toast.contexts";
import { ScheduledServiceType } from "@/types/ScheduleServiceType";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import { getProfileScheduledServices } from "../../services/schedulesServices.services";
import { useQuery } from "@tanstack/react-query";
import * as S from './styles';
import { Tab } from "@/components/Tab";
import { Loading } from "@/components/Loading";
import { FlatList, RefreshControl } from "react-native";

export function ScheduledServicesList() {
  const { show } = useToast();
  const navigation = useNavigation<any>();
  const [currentTab, setCurrentTab] = React.useState(0);

  const [isLoadingPending, setIsLoadingPending] = React.useState(false);

  const [isLoadingOnGoing, setIsLoadingOnGoing] = React.useState(false);

  const [isLoadingFinished, setIsLoadingFinished] = React.useState(false);

  async function fetchPending() {
    setIsLoadingPending(true);
    try {
      const response = await getProfileScheduledServices(1);

      setIsLoadingPending(false);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os serviços pendentes',
      });
      setIsLoadingPending(false);
      return [];
    }
  }

  async function fetchOnGoing() {
    setIsLoadingOnGoing(true);
    try {
      const response = await getProfileScheduledServices(2);

      setIsLoadingOnGoing(false);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os serviços em andamento',
      });
      setIsLoadingOnGoing(false);
      return [];
    }
  }

  async function fetchFinished() {
    setIsLoadingFinished(true);
    try {
      const response = await getProfileScheduledServices(4);

      setIsLoadingFinished(false);
      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar os serviços finalizados',
      });
      setIsLoadingFinished(false);
      return [];
    }
  }

  const { 
    data: dataPending, 
    isFetching: isFetchingPending,
    refetch: refetchPending 
  } = useQuery({
    queryKey: ['pendingSchedules'],
    queryFn: fetchPending,
  });

  const { 
    data: dataOnGoing, 
    isFetching: isFetchingOnGoing,
    refetch: refetchOnGoing 
  } = useQuery({
    queryKey: ['ongoingSchedules'],
    queryFn: fetchOnGoing
  });

  const { 
    data: dataFinished, 
    isFetching: isFetchingFinished,
    refetch: refetchFinished 
  } = useQuery({
    queryKey: ['finishedSchedules'],
    queryFn: fetchFinished
  });

  function handleNavigateServiceDetail(service: ScheduledServiceType) {
    navigation.navigate('ServiceDetail', service);
  }

  const pendingComponent = () => {
    if (isLoadingPending || isFetchingPending) {
      return (<Loading />);
    }
  
    return (
      <S.Content>
        <FlatList
          data={dataPending}
          extraData={dataPending}
          keyExtractor={(item: ScheduledServiceType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={<RefreshControl refreshing={isFetchingPending} onRefresh={refetchPending} />}
          renderItem={({ item, index }) => (
            <S.Card key={item.id} onPress={async () => {handleNavigateServiceDetail(item)}}>
              <S.CardTop>
                <S.Title>{item.service.title}</S.Title>
                <S.CardTopRow>
                  <S.UserPhoto
                    source={{
                      uri: item.service.profile.professional_profile.avatar || null,
                    }}
                  />
                  <S.CardText>@{item.service.profile.username}</S.CardText>
                </S.CardTopRow>
                <S.CardText>
                {item?.final_price
                  ? Number(item?.final_price / 100).toLocaleString('pt-br', {
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
              <S.EmptyTitle>Nenhum serviço pendente.</S.EmptyTitle>
            </S.ContainerEmpty>
          }
          onEndReached={() => {
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Content>
    );
  }

  const onGoingComponent = () => {
    if (isLoadingOnGoing || isFetchingOnGoing) {
      return (<Loading />);
    }

    return (
      <S.Content>
        <FlatList
          data={dataOnGoing}
          extraData={dataOnGoing}
          keyExtractor={(item: ScheduledServiceType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={<RefreshControl refreshing={isFetchingOnGoing} onRefresh={refetchOnGoing} />}
          renderItem={({ item, index }) => (
            <S.Card key={item.id} onPress={async () => {handleNavigateServiceDetail(item)}}>
              <S.CardTop>
                <S.Title>{item.service.title}</S.Title>
                <S.CardText>
                {item?.final_price
                  ? Number(item?.final_price / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  : 'R$ 0,00'}
                </S.CardText>
                <S.CardTopRow>
                  <S.UserPhoto
                    source={{
                      uri: item.service.profile.professional_profile.avatar || null,
                    }}
                  />
                  <S.CardText>@{item.service.profile.username}</S.CardText>
                </S.CardTopRow>
              </S.CardTop>
            </S.Card>
          )}
          ListEmptyComponent={
            <S.ContainerEmpty>
              <S.EmptyTitle>Nenhum serviço em andamento.</S.EmptyTitle>
            </S.ContainerEmpty>
          }
          onEndReached={() => {
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Content>
    );
  }

  const finishedComponent = () => {
    if (isLoadingFinished || isFetchingFinished) {
      return (<Loading />);
    }

    return (
      <S.Content>
        <FlatList
          data={dataFinished}
          extraData={dataFinished}
          keyExtractor={(item: ScheduledServiceType) => String(item.id)}
          contentContainerStyle={{ gap: 16 }}
          refreshControl={<RefreshControl refreshing={isFetchingFinished} onRefresh={refetchFinished} />}
          renderItem={({ item, index }) => (
            <S.Card key={item.id} onPress={async () => {handleNavigateServiceDetail(item)}}>
              <S.CardTop>
                <S.Title>{item.service.title}</S.Title>
                <S.CardText>
                {item?.final_price
                  ? Number(item?.final_price / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  : 'R$ 0,00'}
                </S.CardText>
                <S.CardTopRow>
                  <S.UserPhoto
                    source={{
                      uri: item.service.profile.professional_profile.avatar || null,
                    }}
                  />
                  <S.CardText>@{item.service.profile.username}</S.CardText>
                </S.CardTopRow>
              </S.CardTop>
            </S.Card>
          )}
          ListEmptyComponent={
            <S.ContainerEmpty>
              <S.EmptyTitle>Nenhum serviço finalizado.</S.EmptyTitle>
            </S.ContainerEmpty>
          }
          onEndReached={() => {
            return;
          }}
          showsVerticalScrollIndicator={true}
        />
      </S.Content>
    );
  }

  const renderTabs = () => {
    return [{
        title: 'Em aberto',
        component: pendingComponent(),
        ref: React.createRef(),
      },
      {
        title: 'Em andamento',
        component: onGoingComponent(),
        ref: React.createRef(),
      },
      {
        title: 'Finalizados',
        component: finishedComponent(),
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
            offset={33}
          />
        </S.TabContainer>
      </S.Container>
    </S.Wrapper>
  )
}