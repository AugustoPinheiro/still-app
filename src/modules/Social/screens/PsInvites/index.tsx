import React from 'react';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { deletePsInvites, getPsInvites, putAcceptPsInvite } from '@/modules/Social/services/social.services';

import * as S from './styles';
import { useToast } from '@/contexts/Toast.contexts';

export function PsInvites() {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  let [invites, setInvites] = React.useState<any[] | undefined>();
  const { show } = useToast();
  
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['invites'],
      queryFn: getPsInvites,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

  invites = React.useMemo(
    () => data?.pages?.flatMap((page) => page?.result ?? []) ?? [],
    [data]
  );

  function handleNavigateUser(username: string) {
    navigation.navigate('Feed', {
      screen: 'AnotherUserProfile',
      params: {
        username,
      },
    });
  }

  const onAccept = async (inviteId: number, index: number) => {
    try {
      setIsLoading(true);
      await putAcceptPsInvite(inviteId);
      const filteredData = invites?.splice(index, 1);
      setInvites(filteredData);
      refetch();
    } catch (error) {
      show({ type: 'error', message: 'Oops, algo deu errado.' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDecline = async (inviteId: any, index: number) => {
    try {
      setIsLoading(true);
      await deletePsInvites(inviteId);
      const filteredData = invites?.splice(index, 1);
      setInvites(filteredData);
    } catch (error) {
      show({ type: 'error', message: 'Oops, algo deu errado.' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {!isLoading && !invites?.length ? (
        <S.EmptyContainer>
          <S.Title>Você não possui solicitações</S.Title>
        </S.EmptyContainer>
      ) : (
        <S.Content>
          <FlatList
            numColumns={1}
            data={invites}
            extraData={invites}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <S.Card>
                <S.Line>
                  <S.TouchToProfile onPress={() => handleNavigateUser(item.profile.username)}>
                    <S.Photo source={{ uri: item?.profile.professional_profile.avatar }} cachePolicy="disk" />
                    <S.LabelContainer>
                      <S.LabelName numberOfLines={1}>{item?.profile.username}</S.LabelName>
                      <S.SublabelName numberOfLines={1}>{item?.profile.professional_profile.name}</S.SublabelName>
                    </S.LabelContainer>
                  </S.TouchToProfile>
                  <S.ButtonContainer>
                    <S.PrimaryButton onPress={async () => await onAccept(item.id, index)}>
                      <S.PrimaryButtonText>Confirmar</S.PrimaryButtonText>
                    </S.PrimaryButton>
                    <S.Button onPress={async () => await onDecline(item.id, index)}>
                      <S.ButtonText>Deletar</S.ButtonText>
                    </S.Button>
                  </S.ButtonContainer>
                </S.Line>
              </S.Card>
            )}
            onEndReached={() => {
              if (isFetchingNextPage || !hasNextPage) return;
              fetchNextPage();
            }}
            showsVerticalScrollIndicator={true}
          />
        </S.Content>
      )}
    </S.Container>
  );
}
