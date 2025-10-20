import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { getHasRegister } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { HighlightPosts } from '@/modules/Discovery/components/HighlightPosts';
import { getSocialDiscover } from '@/modules/Social/services/social.services';

import * as S from './styles';

export function Highlight() {
  const navigation = useNavigation();
  const { show } = useToast();
  const [showModal, setShowModal] = React.useState(() => getHasRegister());
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;

  async function fetchDiscover({ pageParam = undefined }) {
    try {
      const data = await getSocialDiscover(pageParam);
      return data;
    } catch (error) {
      show({ type: 'error', message: 'Não foi possível carregar os destaques' });
    }
  }

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['highlightSearch'],
    queryFn: fetchDiscover,
    getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
  });

  const DATA = data?.pages.flatMap((page) => page?.result) ?? [];
  const hasData = !!DATA.length;

  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = contentSize.height * 0.5;
    return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (isFetchingNextPage || !hasNextPage) return;
        fetchNextPage();
      }
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  function handleRegister() {
    // @ts-expect-error
    navigation?.navigate('Register', { isCreateProfile });
  }

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      {/* <S.Title>EXPLORAR</S.Title> */}

      <S.ScrollContainer
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <HighlightPosts
          posts={DATA as any}
          onClickPost={(post) => {
            // @ts-expect-error
            navigation.navigate('Discovery', {
              screen: 'PostDiscoveryDetails',
              params: { post },
            });
          }}
        />
        {isFetchingNextPage ? <ActivityIndicator size="small" color="#000" /> : null}
      </S.ScrollContainer>

      {showModal && !isLoading ? (
        hasData ? (
          <Modal>
            <S.ModalContainer>
              <S.TitleModal>Sugestões para o seu estilo</S.TitleModal>
              <S.TextModal>
                Deslize para baixo e confira o que nossa comunidade está compartilhando!
              </S.TextModal>
              <S.ButtonContainer>
                <Button
                  title="Conhecer agora"
                  onPress={() => setShowModal(false)}
                  marginBottom={0}
                />
              </S.ButtonContainer>
            </S.ModalContainer>
          </Modal>
        ) : (
          <Modal>
            <S.ModalContainer>
              <S.TitleModal>Ops!!!</S.TitleModal>
              <S.TextModal>
                {
                  'Parece que a comunidade ainda não compartilhou nada.\nMas não se preocupe, continue seu cadastro e logo você terá acesso a tudo que a Still tem para oferecer!'
                }
              </S.TextModal>
              <S.ButtonContainer>
                <Button title="Continuar cadastro" onPress={handleRegister} />
              </S.ButtonContainer>
            </S.ModalContainer>
          </Modal>
        )
      ) : (
        <></>
      )}

      <S.ButtonBottomContainer>
        <Button title="Continuar cadastro" type="secondary" onPress={handleRegister} />
      </S.ButtonBottomContainer>
    </S.Container>
  );
}
