import React from 'react';
import { Alert, View, FlatList } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { useToast } from '@/contexts/Toast.contexts';
import { getOffersById, putOfferComplete } from '@/modules/Offers/services/offers.services';
import { putOfferCancel } from '@/modules/Settings/services/settings.services';

import * as S from './styles';

export function DetailsDone() {
  const { params } = useRoute<any>();
  const offerId = params?.offerId;
  const postId = params?.postId;
  const status = params?.status;
  const clothings = params?.clothings;
  const theme = useTheme();
  const { show } = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<any>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['offersDone', postId, status],
    queryFn: async () => await getOffersById(postId, status, true, offerId),
    enabled: !!postId,
  });

  function hasClothings(clothingsIds: any[]) {
    if (!clothings?.length) return clothingsIds?.length === 0;

    return clothingsIds?.some(({ id }) => clothings?.includes(id));
  }

  const filteredData = data?.filter((item) => hasClothings(item?.clothing_list));

  const firstPost = filteredData?.filter((item) => item?.id === offerId)?.at(0) ?? data?.at(0);

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

  async function handleCancelOffer() {
    try {
      setLoading(true);

      Alert.alert('Cancelar oferta', 'Deseja realmente cancelar a oferta?', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await putOfferCancel(offerId);
            await refetch();
            navigation.goBack();
          },
        },
      ]);
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

  const renderItem = React.useCallback(
    ({ item }) => (
      <>
        <S.CardWrapper>
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
              </View>
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

          {item?.description ? <S.Description>{item?.description}</S.Description> : <></>}

          {status === 'pending' ? (
            <S.CardButtonsContainers>
              <Button
                weight="flat"
                title="Cancelar"
                onPress={handleCancelOffer}
                type="secondary"
                marginBottom={0}
              />
            </S.CardButtonsContainers>
          ) : (
            <S.Section>
              <Button
                type="primary"
                title="Chat"
                onPress={async () => await handleGoToChat(item.for_profile.id)}
                weight="flat"
                marginBottom={0}
              />
            </S.Section>
          )}
        </S.CardWrapper>
        {status === 'accepted' && !item?.buyer_agreed ? (
          <S.Section>
            <S.SectionTitle>VOCÊ JÁ RECEBEU ESSA PEÇA?</S.SectionTitle>
            <S.CardAcceptedButtonsContainers>
              <Button
                title="Sim"
                weight="flat"
                onPress={async () => await handleCompleteOffer(item.id, item.for_profile.username)}
                width={133}
              />
              <Button
                title="Não"
                type="secondary"
                weight="flat"
                width={133}
                onPress={() => navigation.navigate('SupportDone', { offerId: item?.id })}
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
      {loading || isLoading ? <Loading /> : <></>}
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
