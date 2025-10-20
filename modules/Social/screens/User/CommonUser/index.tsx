import React, { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { useNavigation } from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { MenuAnotherUser } from '@/modules/Social/components/MenuAnotherUser';
import { ProfileTabs } from '@/modules/Social/components/ProfileTabs';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { followOrUnfolloUser } from '@/modules/Social/services/anotherpersonprofile.services';
import { deleteFollowRequest } from '@/modules/Social/services/social.services';

import * as S from './styles';

export function CommonUser({ username }: { username: string }) {
  const { expand, setBottomSheetProps } = useBottomSheet();
  const [currentTab, setCurrentTab] = React.useState(0);
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
  } = useAnotherProfile();

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
            <S.HeaderPhoto
              source={{ uri: userData?.avatar, width: 80, height: 80, isAnimated: false }}
              allowDownscaling={false}
              cachePolicy="memory-disk"
              recyclingKey={userData?.avatar}
            />
            <S.HeaderButtonRight onPress={handleOpenMenu}>
              <S.HeaderIconRight name="menu" />
            </S.HeaderButtonRight>
          </S.Header>
          <S.NameText>{[userData?.name, userData?.last_name].join(' ')}</S.NameText>
          <S.AtNameText>@{userData?.username}</S.AtNameText>

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
            <S.InfoContent>
              <S.NumberText>{userData?.followers}</S.NumberText>
              <S.LabelNumberText>Seguidores</S.LabelNumberText>
            </S.InfoContent>
            <S.InfoContentButton onPress={() => setCurrentTab(2)}>
              <S.NumberText>{userData?.clothings}</S.NumberText>
              <S.LabelNumberText>Peças no closet</S.LabelNumberText>
            </S.InfoContentButton>
            <S.InfoContent>
              <S.NumberText>{userData?.following}</S.NumberText>
              <S.LabelNumberText>Seguindo</S.LabelNumberText>
            </S.InfoContent>
          </S.InfoContainer>
          <S.TabContainer>
            <ProfileTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              key={`profile_tabs_${username}`}
            />
          </S.TabContainer>
        </S.Content>
      </S.ScrollContainer>
    </S.Container>
  );
}
