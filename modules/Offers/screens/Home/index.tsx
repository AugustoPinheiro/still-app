import React, { useEffect } from 'react';
import { Alert, View, FlatList } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { Rating } from '@kolking/react-native-rating';
import { StackActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNowStrict } from 'date-fns';
import { useTheme } from 'styled-components/native';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { getUserData } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { formatDistanceOptions } from '@/modules/Offers/screens/Home/utils';
import {
  getOffersById,
  putOfferAccept,
  putOfferComplete,
  putOfferDecline,
} from '@/modules/Offers/services/offers.services';

import * as S from './styles';

export function Offers() {
  const { params } = useRoute<any>();
  const offerId = params?.offerId;
  const postId = params?.postId;
  const theme = useTheme();
  const { show } = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const userData = getUserData();
  const [chatLoading, setChatLoading] = React.useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['offers', postId, offerId],
    queryFn: async () => await getOffersById(postId, undefined, undefined, offerId),
  });

  useFocusEffect(() => {
    refetch();
  });

  const offer = React.useMemo(() => {
    return data?.filter((item: any) => item?.id === Number(offerId));
  }, [data]);

  const ismyOwnOffer = React.useMemo(() => {
    return offer?.some((item: any) => item?.profile?.id === userData?.id);
  }, [offer, offerId]);

  const hasAcceptedOffer = React.useMemo(() => {
    return offer?.filter((item: any) => item?.status === 'accepted');
  }, [offer, offerId]);

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

  async function handleGoToChat(profileId?: number) {
    try {
      setChatLoading(true);
      const userChat = await CometChat.getUser(`${profileId}`);

      // @ts-expect-error
      navigation.navigate('Chat', {
        screen: 'CometChatMessages',
        params: {
          item: userChat,
          from: 'Offers',
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setChatLoading(false);
    }
  }

  useEffect(() => {
    if (offerId === 'support') {
      navigation.dispatch(StackActions.pop(1));
      navigation.dispatch(StackActions.replace('Support', { offerId: postId }));
    }
  }, [offerId]);

  const renderItem = React.useCallback(
    (item) => (
      <S.CardWrapper key={String(item.id)}>
        <S.CardHeader>
          <S.CardUserInfo>
            <S.CardUserPhoto source={{ uri: item?.profile?.avatar }} cachePolicy="disk" />
            <S.CardUserName>@{item?.profile?.username}</S.CardUserName>
          </S.CardUserInfo>
          <S.CardData>
            {item?.created_at
              ? formatDistanceToNowStrict(new Date(item?.created_at), formatDistanceOptions)
              : ''}
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
                  <S.PartsImage
                    source={{ uri: item?.image }}
                    recyclingKey={item?.image}
                    cachePolicy="disk"
                  />
                </S.PartsContainer>
              )}
              contentContainerStyle={{ gap: 12 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </S.ClothingsContainer>
        ) : (
          <S.Description>{item?.description}</S.Description>
        )}
        <View>
          <S.SectionTitle>
            {item?.status === 'completed' ? 'VALOR PAGO' : 'VALOR SUGERIDO'}
          </S.SectionTitle>
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
              onPress={async () => await handleAcceptOffer(item?.id, item?.profile.id)}
              type="primary"
              marginBottom={0}
            />
            <Button
              weight="flat"
              width={136}
              title="Recusar"
              onPress={async () => await handleDeclineOffer(item?.id)}
              type="secondary"
              marginBottom={0}
            />
          </S.CardButtonsContainers>
        ) : (
          <S.Section>
            {item?.status === 'cancelled' ? (
              <S.CancelledText>Oferta cancelada</S.CancelledText>
            ) : (
              <Button
                type="primary"
                title="Chat"
                onPress={async () => await handleGoToChat(item?.profile?.id)}
                weight="flat"
                marginBottom={0}
                disabled={chatLoading}
              />
            )}
          </S.Section>
        )}
      </S.CardWrapper>
    ),
    []
  );

  const renderItemMyOwn = React.useCallback(
    (item) => (
      <S.CardWrapper key={String(item.id)}>
        <S.CardHeader>
          <S.CardUserInfo>
            <S.CardUserPhoto source={{ uri: item?.for_profile?.avatar }} cachePolicy="disk" />
            <S.CardUserNames>
              <S.CardUserName>{item?.for_profile?.name}</S.CardUserName>
              <S.CardUserUsername>@{item?.for_profile?.username}</S.CardUserUsername>
            </S.CardUserNames>
          </S.CardUserInfo>
          <S.CardData>
            <View>
              <S.SectionTitle>VALOR SUGERIDO</S.SectionTitle>
              <S.ValueText>
                {Number(item?.value ?? 0).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </S.ValueText>
            </View>{' '}
          </S.CardData>
        </S.CardHeader>
        <S.RatingContainer>
          <Rating
            size={12}
            rating={item?.for_profile?.rating?.rating ?? 0}
            touchColor={theme.colors.gold_yellow}
            fillColor={theme.colors.gold_yellow}
            baseColor={
              item?.for_profile?.rating?.rating ? theme.colors.gold_yellow : theme.colors.gray05
            }
            variant={!item?.for_profile?.rating?.rating ? 'stars' : 'stars-outline'}
            scale={1}
            spacing={4}
            disabled
          />
          <S.RatingText>{item?.for_profile?.rating?.people ?? 0} avaliações</S.RatingText>
        </S.RatingContainer>

        <S.Description>{item?.description}</S.Description>

        <S.Section>
          {item?.status === 'cancelled' ? (
            <S.CancelledText>Oferta cancelada</S.CancelledText>
          ) : (
            <Button
              type="primary"
              title="Chat"
              onPress={async () => await handleGoToChat(item?.profile?.id)}
              weight="flat"
              marginBottom={0}
              disabled={chatLoading}
            />
          )}
        </S.Section>
      </S.CardWrapper>
    ),
    [chatLoading, theme]
  );

  const renderItemAccepted = React.useCallback(
    (item) => {
      return (
        <View key={String(item.id)}>
          <S.CardWrapper>
            <S.CardHeader>
              <S.CardUserInfo>
                <S.CardUserPhoto
                  source={{ uri: ismyOwnOffer ? item?.for_profile?.avatar : item?.profile?.avatar }}
                  cachePolicy="disk"
                />
                <S.CardUserNames>
                  <S.CardUserName>
                    {ismyOwnOffer ? item?.for_profile?.name : item?.profile?.name}
                  </S.CardUserName>
                  <S.CardUserUsername>
                    @{ismyOwnOffer ? item?.for_profile?.username : item?.profile?.username}
                  </S.CardUserUsername>
                </S.CardUserNames>
              </S.CardUserInfo>
              <S.CardData>
                <View>
                  <S.SectionTitle>VALOR SUGERIDO</S.SectionTitle>
                  <S.ValueText>
                    {Number(item?.value ?? 0).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </S.ValueText>
                </View>{' '}
              </S.CardData>
            </S.CardHeader>
            <S.RatingContainer>
              <Rating
                size={12}
                rating={item?.profile?.rating?.rating ?? 0}
                touchColor={theme.colors.gold_yellow}
                fillColor={theme.colors.gold_yellow}
                baseColor={
                  item?.profile?.rating?.rating ? theme.colors.gold_yellow : theme.colors.gray05
                }
                variant={!item?.profile?.rating?.rating ? 'stars' : 'stars-outline'}
                scale={1}
                spacing={4}
                disabled
              />
              <S.RatingText>{item?.profile?.rating?.people ?? 0} avaliações</S.RatingText>
            </S.RatingContainer>

            <S.Description>{item?.description}</S.Description>

            {item?.status === 'accepted' ? (
              <S.Section>
                <Button
                  type="primary"
                  title="Chat"
                  onPress={async () =>
                    await handleGoToChat(ismyOwnOffer ? item?.for_profile?.id : item?.profile?.id)
                  }
                  weight="flat"
                  marginBottom={0}
                  disabled={chatLoading}
                />
              </S.Section>
            ) : (
              <></>
            )}
          </S.CardWrapper>
          {(ismyOwnOffer && !item?.buyer_agreed) || (!ismyOwnOffer && !item?.seller_agreed) ? (
            <S.Section>
              <S.SectionTitle>
                {ismyOwnOffer ? 'VOCÊ JÁ RECEBEU ESSA PEÇA?' : 'VOCÊ JÁ RECEBEU ESSE PAGAMENTO?'}
              </S.SectionTitle>
              <S.CardCompletedButtonsContainers>
                <Button
                  title="Sim"
                  weight="flat"
                  onPress={() => {
                    handleCompleteOffer(
                      item.id,
                      ismyOwnOffer
                        ? offer?.[0]?.for_profile?.username
                        : offer?.[0]?.profile?.username
                    );
                  }}
                  width={133}
                />
                <Button
                  title="Não"
                  type="secondary"
                  weight="flat"
                  width={133}
                  onPress={() => navigation.navigate('Support', { offerId })}
                />
              </S.CardCompletedButtonsContainers>
            </S.Section>
          ) : (
            <></>
          )}
        </View>
      );
    },
    [ismyOwnOffer, offer, navigation, theme]
  );

  if (ismyOwnOffer || hasAcceptedOffer?.length) {
    return (
      <>
        {loading || isLoading ? <Loading /> : <></>}
        <S.Container>
          <S.ImagePost source={{ uri: offer?.[0]?.image }} cachePolicy="disk" />
          <S.Section>
            <S.SectionTitle>MINHAS OFERTAS</S.SectionTitle>
            {hasAcceptedOffer?.length || offer?.length ? (
              <S.ContainerList>
                {hasAcceptedOffer?.length
                  ? hasAcceptedOffer?.map((item: any) => renderItemAccepted(item))
                  : offer?.map((item: any) => renderItemMyOwn(item))}
              </S.ContainerList>
            ) : (
              <></>
            )}
          </S.Section>
        </S.Container>
      </>
    );
  }

  return (
    <>
      {loading || isLoading ? <Loading /> : <></>}
      <S.Container>
        <S.ImagePost source={{ uri: offer?.[0]?.image }} cachePolicy="disk" />
        <S.Section>
          <S.SectionTitle>MINHAS OFERTAS</S.SectionTitle>
          {offer?.length ? (
            <S.ContainerList>{offer?.map((item: any) => renderItem(item))}</S.ContainerList>
          ) : (
            <></>
          )}
        </S.Section>
      </S.Container>
    </>
  );
}
