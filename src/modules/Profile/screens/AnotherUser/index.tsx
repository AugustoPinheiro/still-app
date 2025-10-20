import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, Modal, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { ImageViewer } from '@/components/ImageViewer';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { AnotherProfileTabs } from '@/modules/Profile/components/AnotherProfileTabs';
import { useAnotherProfile } from '@/modules/Profile/contexts/anotherProfile.contexts';
import { ProfileStackParamList } from '@/modules/Profile/routes/profile.types';
import { MenuAnotherUser } from '@/modules/Social/components/MenuAnotherUser';
import { followOrUnfolloUser } from '@/modules/Social/services/anotherpersonprofile.services';
import { deleteFollowRequest } from '@/modules/Social/services/social.services';

import * as S from './styles';

export function AnotherUser() {
  const navigation = useNavigation<any>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const { params } = useRoute<RouteProp<ProfileStackParamList, 'AnotherUser'>>();
  const { username, id } = params;

  const {
    userData,
    isLoadingUser,
    refetchUser,
    selectedTab,
    isFetchingNextPagePosts,
    hasNextPagePosts,
    fetchNextPagePosts,
    setUsername,
  } = useAnotherProfile();

  const { expand, setBottomSheetProps } = useBottomSheet();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const isStore = userData?.profile_type === 'store';
  const isProfessional = userData?.profile_type === 'professional';

  function handleOpenMenu() {
    setBottomSheetProps({
      id: 'MenuAnotherUserProfile',
      content: <MenuAnotherUser username={username} id={id} />,
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

  const handleImagePress = (imageUri: string) => {
    console.log('=== HANDLE IMAGE PRESS ===');
    console.log('imageUri:', imageUri);
    console.log('imageViewerVisible before setState:', imageViewerVisible);
    setSelectedImage(imageUri);
    setImageViewerVisible(true);
    console.log('States updated - selectedImage:', imageUri, 'imageViewerVisible: true');
  };

  const handleCloseImageViewer = () => {
    setImageViewerVisible(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    username && setUsername(username);
  }, [username]);

  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }: any) => {
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
    [selectedTab, isFetchingNextPagePosts, hasNextPagePosts, fetchNextPagePosts]
  );

  if (isLoadingUser) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container key={username}>
      <S.ScrollContainer
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refetchUser();
            }}
          />
        }
      >
        <S.Content>
          <S.Header>
            <S.HeaderButtonLeft></S.HeaderButtonLeft>
            
            {/* Test Button */}
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16
              }}
              onPress={() => {
                console.log('=== TEST BUTTON PRESSED ===');
                handleImagePress('https://via.placeholder.com/300x300');
              }}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>TEST</Text>
            </TouchableOpacity>
            
            <S.HeaderPhoto 
              activeOpacity={0.7}
              onPress={() => {
                console.log('=== HEADER PHOTO PRESSED ===');
                console.log('userData:', userData);
                console.log('avatar:', userData?.avatar);
                console.log('imageViewerVisible before:', imageViewerVisible);
                if (userData?.avatar) {
                  console.log('Calling handleImagePress with:', userData.avatar);
                  handleImagePress(userData.avatar);
                } else {
                  console.log('No avatar available');
                }
              }}
            >
              <S.HeaderPhotoContent 
                source={{ uri: userData?.avatar }} 
                cachePolicy="disk" 
              />
            </S.HeaderPhoto>
            <S.HeaderButtonRight onPress={handleOpenMenu}>
              <S.HeaderIconRight name="menu" />
            </S.HeaderButtonRight>
          </S.Header>
          <S.NameText>{[userData?.name, userData?.last_name].join(' ')}</S.NameText>
          {isStore ? (
            <S.RowCenter>
              <S.AtNameText>@{userData?.username}</S.AtNameText>
              <S.Divider />
              <S.AtNameText>Loja</S.AtNameText>
              <S.Divider />
              <S.AtNameText>Venda</S.AtNameText>
            </S.RowCenter>
          ) : isProfessional ? (
            <S.RowCenter>
              <S.AtNameText>@{userData?.username}</S.AtNameText>
              <S.Divider />
              <S.AtNameText>Personal Stylist</S.AtNameText>
            </S.RowCenter>
          ) : (
            <S.AtNameText>@{userData?.username}</S.AtNameText>
          )}
          <S.Row>
            <S.Button
              onPress={async () => {
                try {
                  setLoadingChat(true);
                  const userChat = await CometChat.getUser(`${userData?.id}`);

                  navigation.navigate('Chat', {
                    screen: 'CometChatMessages',
                    params: {
                      item: userChat,
                      from: 'Profile',
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
            <S.InfoContent activeOpacity={1}>
              <S.NumberText>{userData?.followers}</S.NumberText>
              <S.LabelNumberText>seguidores</S.LabelNumberText>
            </S.InfoContent>

            {!isStore ? (
              <S.InfoContent onPress={() => setCurrentTab(2)}>
                <S.NumberText>{userData?.clothings}</S.NumberText>
                <S.LabelNumberText>peças no closet</S.LabelNumberText>
              </S.InfoContent>
            ) : (
              <></>
            )}

            <S.InfoContent activeOpacity={1}>
              <S.NumberText>{userData?.following}</S.NumberText>
              <S.LabelNumberText>seguindo</S.LabelNumberText>
            </S.InfoContent>
          </S.InfoContainer>
          <S.TabContainer>
            <AnotherProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </S.TabContainer>
        </S.Content>
      </S.ScrollContainer>

      {/* Test Modal */}
      {console.log('Rendering modal - imageViewerVisible:', imageViewerVisible, 'selectedImage:', selectedImage)}
      {imageViewerVisible && (
        <Modal
          visible={imageViewerVisible}
          transparent
          animationType="fade"
          onRequestClose={handleCloseImageViewer}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transparent'
              }}
              onPress={handleCloseImageViewer}
            />
            <Image
              source={{ uri: selectedImage || '' }}
              style={{
                width: 300,
                height: 300,
              }}
              contentFit="contain"
              cachePolicy="disk"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 50,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={handleCloseImageViewer}
            >
              <Text style={{ color: '#FFF', fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </S.Container>
  );
}
