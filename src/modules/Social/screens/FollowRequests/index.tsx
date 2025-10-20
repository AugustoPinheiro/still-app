import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useSocial } from '@/modules/Social/contexts/social.contexts';
import {
  deleteFollowRequest,
  putAcceptFollowRequest,
} from '@/modules/Social/services/social.services';

import * as S from './styles';

export function FollowRequests() {
  const navigation = useNavigation<any>();
  const {
    followRequests,
    refetchFollowRequests,
    fetchNextPageFollowRequests,
    isFetchingFollowRequests,
    isLoadingFollowRequests,
    isFetchingNextPageFollowRequests,
    hasNextPageFollowRequests,
  } = useSocial();
  const [isUserLoading, setIsUserLoading] = React.useState<string[]>([]);

  function handleNavigateUser(username: string) {
    navigation.navigate('Feed', {
      screen: 'AnotherUserProfile',
      params: {
        username,
      },
    });
  }

  const handleAccept = useCallback(async (username: string) => {
    try {
      setIsUserLoading((prev) => [...prev, username]);
      await putAcceptFollowRequest(username);
      await refetchFollowRequests();
    } catch (er) {
      console.error(er);
    } finally {
      setIsUserLoading((prev) => prev.filter((item) => item !== username));
    }
  }, []);

  const handleReject = useCallback(async (username: string) => {
    try {
      setIsUserLoading((prev) => [...prev, username]);
      await deleteFollowRequest(username);
      await refetchFollowRequests();
    } catch (er) {
      console.error(er);
    } finally {
      setIsUserLoading((prev) => prev.filter((item) => item !== username));
    }
  }, []);

  useEffect(() => {
    refetchFollowRequests();
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <S.Line>
          <S.TouchToProfile onPress={() => handleNavigateUser(item.username)}>
            <S.Photo source={{ uri: item?.avatar }} cachePolicy="disk" />
            <S.LabelContainer>
              <S.LabelName numberOfLines={1}>{item?.username}</S.LabelName>
              <S.SublabelName numberOfLines={1}>{item?.name}</S.SublabelName>
            </S.LabelContainer>
          </S.TouchToProfile>
          {isUserLoading.includes(item.username) ? (
            <S.ButtonContainer>
              <ActivityIndicator size="small" />
            </S.ButtonContainer>
          ) : (
            <S.ButtonContainer>
              <S.PrimaryButton onPress={async () => await handleAccept(item.username)}>
                <S.PrimaryButtonText>Confirmar</S.PrimaryButtonText>
              </S.PrimaryButton>
              <S.Button onPress={async () => await handleReject(item.username)}>
                <S.ButtonText>Deletar</S.ButtonText>
              </S.Button>
            </S.ButtonContainer>
          )}
        </S.Line>
      );
    },
    [isUserLoading]
  );

  if (!followRequests?.length) {
    return (
      <S.Container>
        <S.Label>Não há solicitações de seguidores</S.Label>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <FlatList
        data={followRequests}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.username}_${index}`}
        contentContainerStyle={{ gap: 16 }}
        ListEmptyComponent={() => <S.Label>Não há solicitações de seguidores</S.Label>}
        onEndReached={() => {
          if (
            hasNextPageFollowRequests &&
            !isFetchingNextPageFollowRequests &&
            !isFetchingFollowRequests &&
            !isLoadingFollowRequests
          ) {
            fetchNextPageFollowRequests();
          }
        }}
        refreshControl={
          <RefreshControl refreshing={isLoadingFollowRequests} onRefresh={refetchFollowRequests} />
        }
      />
    </S.Container>
  );
}
