import React from 'react';
import { Platform, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import * as amplitude from '@amplitude/analytics-react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import {
  CommonActions,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Post } from '@/components/Post';
import { clearStorage, getProfile, isLogged, storage } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';
import { SocialStackParamList } from '@/modules/Social/routes/social.types';
import { getSocialFeed } from '@/modules/Social/services/social.services';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

type Props = {
  handleGoToStore: (post: SocialFeedType) => void;
  listRef: React.RefObject<FlatList<any>>;
};
export function PostsList({ handleGoToStore, listRef }: Props) {
  const { show } = useToast();
  const navigation = useNavigation<NavigationProp<SocialStackParamList>>();
  const [showMyLookModal, setShowMyLookModal] = React.useState(true);
  const refetchDebounce = React.useRef(true);
  const firstRender = React.useRef(true);
  const user = getProfile();

  const handleLogout = async () => {
    clearStorage();
    CometChat.logout();
    OneSignal.logout();

    const routes = {
      index: 0,
      routes: [{ name: 'Login' }],
    };

    navigation.dispatch(CommonActions.reset(routes));
  };

  async function fetchSocialPosts({ pageParam = undefined }) {
    try {
      const data = await getSocialFeed(pageParam);

      return data;
    } catch (error: any) {
      const message = error?.message ?? 'Não foi possível carregar os posts';

      if (message === 'Profile not found') {
        handleLogout();
        return [];
      }

      show({
        type: 'error',
        message,
      });

      return [];
    }
  }

  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['socialPostsList'],
      queryFn: fetchSocialPosts,
      initialPageParam: undefined,
      getNextPageParam: (lastPage: any) => lastPage?.meta?.cursor,
    });

  const posts = React.useMemo(() => {
    return data?.pages?.flatMap((page: any) =>
      page?.result ? page?.result : []
    ) as SocialFeedType[];
  }, [data?.pages]);

  const renderPost = React.useCallback(({ item }: { item: SocialFeedType }) => {
    return <Post post={item} isFeed onGoToStore={handleGoToStore} />;
  }, []);

  const renderHeader = React.useCallback(() => {
    if (!isLogged()) {
      return <></>;
    }

    return (
      <S.ContentLook>
        <S.AtNameText>
          Olá{`, ${user?.name}${user?.last_name ? ' ' + user?.last_name : ''}!`}
        </S.AtNameText>
        {showMyLookModal ? (
          <S.MyLookContainer>
            <S.MyLookRow>
              <S.TitleLook>MEU LOOK</S.TitleLook>
              <TouchableOpacity onPress={() => setShowMyLookModal(false)}>
                <Image
                  source={require('@/assets/images/close.png')}
                  contentFit="contain"
                  style={{ width: 17, height: 17 }}
                />
              </TouchableOpacity>
            </S.MyLookRow>
            <S.SubtitleLook>Mostra pra gente o que você está vestindo!</S.SubtitleLook>
            <Button
              title="Compartilhar meu look"
              marginBottom={0}
              onPress={() => {
                amplitude.track('Click Share My Look');
                navigation.navigate('NewLook');
              }}
            />
          </S.MyLookContainer>
        ) : (
          <></>
        )}
      </S.ContentLook>
    );
  }, [user?.name, user?.last_name, showMyLookModal]);

  async function refetchFirstPage() {
    if (!isFetching && refetchDebounce.current) {
      refetchDebounce.current = false;
      await refetch({});

      setTimeout(() => {
        refetchDebounce.current = true;
      }, 1000);
    }
  }

  const handleOnEndReached = React.useCallback(() => {
    if (isFetchingNextPage || !hasNextPage || isFetching || isLoading) return;
    fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, isFetching, isLoading]);

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogged() || firstRender.current) return;

      refetchFirstPage();

      return () => {
        firstRender.current = false;
      };
    }, [])
  );

  React.useEffect(() => {
    const listenerStorage = storage.addOnValueChangedListener((key) => {
      if (key === 'profile') {
        const data = storage.getString('profile');

        if (!data) return;

        refetch();
      }
    });

    return () => {
      listenerStorage.remove();
    };
  }, [storage]);

  return (
    <FlatList
      key="list_posts_flatList"
      ref={listRef}
      data={posts}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item) => `post_${item?.id}`}
      renderItem={renderPost}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      decelerationRate={Platform.OS === 'ios' ? 0.994 : 0.95}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetchFirstPage} />}
      onEndReached={handleOnEndReached}
      ListFooterComponent={() => (isFetchingNextPage ? <Loading hasBackground={false} /> : <></>)}
    />
  );
}
