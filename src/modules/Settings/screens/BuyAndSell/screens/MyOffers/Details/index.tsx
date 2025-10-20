import React from 'react';
import { Alert, View, FlatList } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components/native';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import {
  getOffersById,
  putOfferAccept,
  putOfferComplete,
  putOfferDecline,
} from '@/modules/Offers/services/offers.services';

import * as S from './styles';

export function Details() {
  const { params } = useRoute<any>();
  const postId = params?.postId;
  const offerId = params?.offerId;
  const clothings = params?.clothings;
  const status = params?.status;
  const theme = useTheme();
  const { show } = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<any>();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['offersReceive', postId, status],
    queryFn: async () => await getOffersById(postId, status, false, offerId),
    enabled: !!postId,
  });

  function hasClothings(clothingsIds: any[]) {
    return clothingsIds?.some(({ id }) => clothings?.includes(id));
  }

  const filteredData = data?.filter((item) =>
    clothings?.length ? hasClothings(item?.clothing_list) : true
  );

  const firstPost = filteredData?.filter((item) => item?.id === offerId)?.at(0) ?? data?.at(0);

  const formatDistanceOptions = {
    locale: {
      ...ptBR,
      formatDistance: (unit: string, count: number) => {
        switch (true) {
          case unit === 'xDays':
            return `${count}d`;

          case unit === 'xHours':
            return `${count}h`;

          case unit === 'xMinutes':
            return `${count}min`;

          case unit === 'xMonths':
            return `${count}M`;

          case unit === 'xSeconds':
            return `${count}s`;

          case unit === 'xYears':
            return `${count}y`;
        }

        return '%d hours';
      },
    },
  };

  async function handleGoToChat(profileId: number) {
    const userChat = await CometChat.getUser(`${profileId}`);

    navigation.navigate('Chat', {
      screen: 'CometChatMessages',
      params: {
        item: userChat,
        from: 'Profile',
      },
    });
  }

  async function handleAcceptOffer(offerId: number, profileId: number) {
    try {
      setLoading(true);

      await putOfferAccept(offerId);
      refetch();

      try {
        const userChat = await CometChat.getUser(`${profileId}`);

        navigation.navigate('Chat', {
          screen: 'CometChatMessages',
          params: {
            item: userChat,
            from: 'Profile',
          },
        });
      } catch (error) {
        console.error(error);

        navigation.goBack();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Erro ao aceitar oferta';

      show({
        message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeclineOffer(offer: number) {
    Alert.alert('Atenção', 'Esta opção não pode ser desfeita', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        style: 'default',
        onPress: async () => {
          try {
            setLoading(true);

            await putOfferDecline(offer);
            await refetch();
            show({
              message: 'Oferta recusada com sucesso',
              type: 'success',
            });

            navigation.goBack();
          } catch (error) {
            const message = error?.message ?? 'Erro ao recusar oferta';

            show({
              message,
              type: 'error',
            });
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  async function handleCompleteOffer(offer: number, username: string) {
    Alert.alert('Atenção', 'Esta opção não pode ser desfeita', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        style: 'default',
        onPress: async () => {
          try {
            setLoading(true);
            await putOfferComplete(offer);
            await refetch();
            navigation.navigate('Evaluation', { username });
          } catch (error) {
            const message = error?.response?.data?.message ?? 'Erro ao completar oferta';

            show({
              message,
              type: 'error',
            });
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  const renderItem = React.useCallback(
    ({ item }) => (
      <>
        <S.CardWrapper>
          <S.CardHeader>
            <S.CardUserInfo>
              <S.CardUserPhoto source={{ uri: item?.profile?.avatar }} cachePolicy="disk" />
              <S.CardUserName>@{item?.profile?.username}</S.CardUserName>
            </S.CardUserInfo>
            <S.CardData>
              {formatDistanceToNowStrict(new Date(item?.created_at), formatDistanceOptions)}
            </S.CardData>
          </S.CardHeader>
          <S.RatingContainer>
            <Rating
              size={12}
              rating={item?.profile?.rating?.rating ?? 0}
              touchColor={theme.colors.gold_yellow}
              fillColor={theme.colors.gold_yellow}
              scale={1}
              disabled
            />
            <S.RatingText>{item?.profile?.rating?.people ?? 0} avaliações</S.RatingText>
          </S.RatingContainer>
          {item?.clothing_list?.length ? (
            <S.ClothingsContainer>
              <FlatList
                data={item?.clothing_list}
                keyExtractor={(item) => String(item?.id)}
                renderItem={({ item }) => (
                  <S.PartsContainer>
                    <S.PartsImage source={{ uri: item?.image }} cachePolicy="disk" />
                  </S.PartsContainer>
                )}
                contentContainerStyle={{ gap: 12 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </S.ClothingsContainer>
          ) : (
            <></>
          )}
          <S.Description>{item?.description}</S.Description>
          <View>
            <S.SectionTitle>VALOR SUGERIDO</S.SectionTitle>
            <S.ValueText>
              {Number(item?.value ?? 0).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </S.ValueText>
          </View>
          {item?.status === 'pending' ? (
            <S.CardButtonsContainers>
              <Button
                weight="flat"
                width={136}
                title="Aceitar"
                onPress={async () => await handleAcceptOffer(item.id, item.profile.id)}
                type="primary"
                marginBottom={0}
              />
              <Button
                weight="flat"
                width={136}
                title="Recusar"
                onPress={async () => await handleDeclineOffer(item.id)}
                type="secondary"
                marginBottom={0}
              />
            </S.CardButtonsContainers>
          ) : (
            <S.Section>
              <Button
                type="primary"
                title="Chat"
                onPress={async () => await handleGoToChat(item.profile.id)}
                weight="flat"
                marginBottom={0}
              />
            </S.Section>
          )}
        </S.CardWrapper>
        {item?.status === 'accepted' && !item?.seller_agreed ? (
          <S.Section>
            <S.SectionTitle>VOCÊ JÁ RECEBEU ESSE PAGAMENTO?</S.SectionTitle>
            <S.CardAcceptedButtonsContainers>
              <Button
                title="Sim"
                weight="flat"
                onPress={async () => await handleCompleteOffer(item.id, item.profile.username)}
                width={133}
              />
              <Button
                title="Não"
                type="secondary"
                weight="flat"
                onPress={() => navigation.navigate('Support', { offerId: item?.id })}
                width={133}
              />
            </S.CardAcceptedButtonsContainers>
          </S.Section>
        ) : (
          <></>
        )}
      </>
    ),
    []
  );

  return (
    <>
      {loading || isFetching ? <Loading /> : <></>}
      <S.Container>
        <S.ImagePost source={{ uri: firstPost?.image }} cachePolicy="disk" />
        <S.Section>
          <S.SectionTitle>MINHAS OFERTAS</S.SectionTitle>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ gap: 18 }}
            renderItem={renderItem}
          />
        </S.Section>
      </S.Container>
    </>
  );
}
