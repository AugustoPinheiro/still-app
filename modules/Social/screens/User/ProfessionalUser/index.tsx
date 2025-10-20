import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import {
  RouteProp,
  StackActions,
  TabActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { getProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { MenuAnotherUser } from '@/modules/Social/components/MenuAnotherUser';
import { ProfileTabs } from '@/modules/Social/components/ProfileTabs';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { followOrUnfolloUser } from '@/modules/Social/services/anotherpersonprofile.services';
import { deleteFollowRequest } from '@/modules/Social/services/social.services';

import { SocialStackParamList } from '../../../routes/social.types';
import * as S from './styles';

export function ProfessionalUser() {
  const { expand, setBottomSheetProps } = useBottomSheet();
  const [currentTab, setCurrentTab] = React.useState(0);
  const user = getProfile();
  const navigation = useNavigation();
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const {
    userData,
    isLoadingUser,
    selectedTab,
    isFetchingNextPagePosts,
    hasNextPagePosts,
    refetchUser,
    refetchAll,
    fetchNextPagePosts,
    setUsername,
  } = useAnotherProfile();

  const { params } = useRoute<RouteProp<SocialStackParamList, 'AnotherUserProfile'>>();

  const { username } = params;

  function handleOpenMenu() {
    setBottomSheetProps({
      id: 'MenuAnotherUserProfile',
      content: <MenuAnotherUser username={username} id={`${userData?.id}`} />,
      snapPoints: ['20%'],
    });
    expand();
  }

  async function handleFollowOrUnfolloUser() {
    setLoadingFollow(true);
    if (userData?.follow_pending) {
      await deleteFollowRequest(username);
    } else {
      await followOrUnfolloUser(username, !userData?.followed);
    }

    await refetchUser();
    setLoadingFollow(false);
  }

  useEffect(() => {
    if (user?.username === username) {
      navigation.dispatch(StackActions.pop(1));
      navigation.dispatch(TabActions.jumpTo('Profile'));
    }
  }, []);

  useEffect(() => {
    username && setUsername(username);
  }, [username]);

  // @ts-expect-error
  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = contentSize.height * 0.5;
    return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (selectedTab === 'posts') {
          if (isFetchingNextPagePosts || !hasNextPagePosts) return;
          fetchNextPagePosts();
        }
      }
    },
    [selectedTab, isFetchingNextPagePosts, hasNextPagePosts]
  );

  if (isLoadingUser) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container key={username}>
      <S.ScrollContainer
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refetchAll();
            }}
          />
        }
      >
        <S.Content>
          <S.Header>
            <S.HeaderButtonLeft></S.HeaderButtonLeft>
            <S.HeaderPhoto source={{ uri: userData?.avatar }} cachePolicy="disk" />
            <S.HeaderButtonRight onPress={handleOpenMenu}>
              <S.HeaderIconRight name="menu" />
            </S.HeaderButtonRight>
          </S.Header>
          <S.NameText>{[userData?.name, userData?.last_name].join(' ')}</S.NameText>
          <S.WrapperUsername style={{ marginTop: 4 }}>
            <S.AtNameText style={{ flexBasis: '46%', textAlign: 'right' }}>
              @{userData?.username}
            </S.AtNameText>
            <S.WrapperRound />
            <S.AtNameText style={{ flexBasis: '46%', textAlign: 'left' }}>
              Personal Stylist
            </S.AtNameText>
          </S.WrapperUsername>

          <S.Row>
            <S.Button
              onPress={async () => {
                try {
                  setLoadingChat(true);
                  const userChat = await CometChat.getUser(`${userData?.id}`);

                  // @ts-expect-error
                  navigation.navigate('Chat', {
                    screen: 'CometChatMessages',
                    params: {
                      item: userChat,
                    },
                  });
                } finally {
                  setLoadingChat(false);
                }
              }}
              disabled={loadingChat}
            >
              {loadingChat ? (
                <ActivityIndicator style={{ height: 17 }} />
              ) : (
                <S.ButtonText>Mensagem</S.ButtonText>
              )}
            </S.Button>
            <S.Button
              disabled={loadingFollow}
              isActive={userData?.followed || userData?.follow_pending}
              onPress={handleFollowOrUnfolloUser}
            >
              {loadingFollow ? (
                <ActivityIndicator style={{ height: 17 }} />
              ) : userData?.follow_pending ? (
                <S.ButtonText isActive>Solicitação enviada</S.ButtonText>
              ) : (
                <S.ButtonText isActive={userData?.followed}>
                  {userData?.followed ? 'Seguindo' : 'Seguir'}
                </S.ButtonText>
              )}
            </S.Button>
          </S.Row>
          <S.InfoContainer>
            {/* <S.InfoContent>
              <S.NumberText>{userData?.rating ?? 0}</S.NumberText>
              <S.LabelNumberText>Avaliação</S.LabelNumberText>
            </S.InfoContent> */}
            {/* <S.InfoContent>
              <S.NumberText>{userData?.services ?? 0}</S.NumberText>
              <S.LabelNumberText>Atendimentos</S.LabelNumberText>
            </S.InfoContent> */}
            <S.InfoContent>
              <S.NumberText>{userData?.followers}</S.NumberText>
              <S.LabelNumberText>Seguidores</S.LabelNumberText>
            </S.InfoContent>
            <S.InfoContent>
              <S.NumberText>{userData?.following}</S.NumberText>
              <S.LabelNumberText>Seguindo</S.LabelNumberText>
            </S.InfoContent>
          </S.InfoContainer>
          <S.TabContainer>
            <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </S.TabContainer>
        </S.Content>
      </S.ScrollContainer>
    </S.Container>
  );
}
