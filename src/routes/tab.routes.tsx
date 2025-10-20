import React from 'react';
import { Platform, Text, View } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import * as amplitude from '@amplitude/analytics-react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import FeatherIcon from '@expo/vector-icons/Feather';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';

import { HeaderRoute } from '@/components/HeaderRoute';
import { MainMenuLoginOrRegister } from '@/components/MainMenuLoginOrRegister';
import { MainMenuModal } from '@/components/MainMenuModal';
import { Wrapper } from '@/components/Wrapper';
import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import {
  getAccessToken,
  getProfile,
  getProfiles,
  isLogged,
  setProfile,
} from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { AllSuggestions } from '@/modules/AllSuggestions';
import { ChatStack } from '@/modules/Chat/routes/chat.routes';
import { ClosetStack } from '@/modules/Closet/routes/closet.routes';
import { getClosetClothings, getClosetProfile } from '@/modules/Closet/services/closet.services';
import { OffersStack } from '@/modules/Offers/routes/offers.routes';
import { PostDetails } from '@/modules/PostDetails';
import { MenuProfiles } from '@/modules/Profile/components/MenuProfiles';
import { ProfileStack } from '@/modules/Profile/routes/profile.routes';
import { getProfileByUsername, getProfilePosts } from '@/modules/Profile/services/profile.services';
import { SearchStack } from '@/modules/Search/routes/search.routes';
import { SocialStack } from '@/modules/Social/routes/social.routes';
import { AppTabParamList } from '@/routes/tab.types';
import { ProfileType } from '@/types/ProfileType';

const { Navigator, Screen, Group } = createBottomTabNavigator<AppTabParamList>();
const IS_DEV = EXPO_PUBLIC_IS_DEV;
const BlackScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Em construção</Text>
    </View>
  );
};

const MainIcon = () => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1B1D1F',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FeatherIcon name="plus" color="#FFF" size={24} />
    </View>
  );
};

export function TabRoutes({ navigation }: any) {
  const theme = useTheme();
  const { expand, setBottomSheetProps, close } = useBottomSheet();
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();
  const user = getProfile();
  const profiles = getProfiles();

  function getMockUser(username: string) {
    switch (username) {
      case 'teste5':
        return 21;
      case 'teste6':
        return 25;
      case 'mylycystore':
        return 13;
      case 'mylycy':
        return 4;
      default:
        return 6;
    }
  }

  function handleChooseProfile(profile: ProfileType) {
    if (user?.username === profile?.username) return;

    setProfile(profile);
    queryClient.invalidateQueries({ queryKey: ['profileData'] });
    queryClient.invalidateQueries({ queryKey: ['profileUserPosts'] });
    queryClient.invalidateQueries({ queryKey: ['profileUserArchivedPosts'] });
    queryClient.invalidateQueries({ queryKey: ['profilePostsSaved'] });
    queryClient.invalidateQueries({ queryKey: ['profileClosetClothing'] });
    queryClient.invalidateQueries({ queryKey: ['profileClosetLook'] });
    CometChat.logout();
    OneSignal.logout();

    if (IS_DEV) {
      const mockUser = getMockUser(profile?.username);
      CometChat.login(mockUser, COMETCHAT_AUTH_KEY);
    } else {
      CometChat.login(profile?.id, COMETCHAT_AUTH_KEY);
    }

    OneSignal.login(profile.uuid);

    navigation.navigate('Profile');
  }

  function handleOpenProfiles() {
    const snapPoints =
      !profiles?.length || profiles?.length === 1 ? 156 : profiles?.length * 56 + 100;

    setBottomSheetProps({
      id: 'Profiles',
      content: <MenuProfiles onChooseProfile={handleChooseProfile} />,
      snapPoints: [snapPoints],
    });

    expand();
  }

  function showAuthModal(event: any) {
    event.preventDefault();
    setBottomSheetProps({
      id: 'MainModal',
      content: <MainMenuLoginOrRegister />,
      snapPoints: [416],
    });
    expand();
  }

  const handleListenerLoginOrRegister = {
    tabPress: (e: any) => {
      if (e.target.includes('Search')) {
        amplitude.track('Click Explore');
      }
      if (!accessToken) {
        showAuthModal(e);
      }
    },
    tabLongPress: (e: any) => {
      if (String(e?.target).includes('Profile')) {
        handleOpenProfiles();
      }
    },
  };

  const listners = {
    tabPress: (e: any) => {
      if (!accessToken) {
        showAuthModal(e);
        return;
      }

      close();

      e.preventDefault();
      setBottomSheetProps({
        id: 'MainModal',
        content: <MainMenuModal />,
        snapPoints: [270],
      });
      expand();
    },
  };

  function prefetchData() {
    if (!isLogged()) return;

    queryClient.prefetchQuery({
      queryKey: ['profileData'],
      queryFn: async () => await getProfileByUsername(),
    });

    queryClient.prefetchInfiniteQuery({
      queryKey: ['profileUserPosts'],
      queryFn: async ({ pageParam = undefined }) => await getProfilePosts(pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

    queryClient.prefetchInfiniteQuery({
      queryKey: ['clothings', '', undefined],
      queryFn: async ({ pageParam = undefined }) =>
        await getClosetClothings('', undefined, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    });

    // queryClient.prefetchInfiniteQuery({
    //   queryKey: ['looks', '', undefined],
    //   queryFn: async ({ pageParam = undefined }) => await getClosetLooks('', undefined, pageParam),
    //   initialPageParam: undefined,
    //   getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    // });

    // queryClient.prefetchInfiniteQuery({
    //   queryKey: ['inspirations'],
    //   queryFn: async ({ pageParam = undefined }) => await getClosetInspirations(pageParam),
    //   initialPageParam: undefined,
    //   getNextPageParam: (lastPage) => lastPage?.meta?.cursor,
    // });

    queryClient.prefetchQuery({
      queryKey: [`closetProfile`],
      queryFn: async () => await getClosetProfile(),
    });

    // queryClient.prefetchQuery({
    //   queryKey: ['folders', '', ''],
    //   queryFn: async () => await getClosetFolders(''),
    // });

    // queryClient.prefetchQuery({
    //   queryKey: ['searchProfiles', ''],
    //   queryFn: async () => await searchProfiles(undefined, 'search'),
    // });
  }

  React.useEffect(() => {
    isLogged() && prefetchData();
  }, []);

  return (
    <Wrapper>
      <Navigator
        initialRouteName={'Feed'}
        screenOptions={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
          tabBarActiveTintColor: theme?.colors?.gray02,
          tabBarInactiveTintColor: theme?.colors?.gray04,
          tabBarItemStyle: {
            zIndex: -1,
          },
          tabBarStyle: {
            backgroundColor: theme?.colors?.white,
            minHeight: 64,
            paddingTop: Platform.OS === 'android' ? 0 : 12,
            justifyContent: 'space-between',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.58,
            shadowRadius: 10,
            elevation: 24,
          },
        }}
      >
        <Group key="ShowInTabMenu">
          <Screen
            name="Feed"
            component={SocialStack}
            listeners={handleListenerLoginOrRegister}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <FeatherIcon name="home" color={color} size={24} />
              ),
            }}
          />
          <Screen
            name="Search"
            component={SearchStack}
            listeners={handleListenerLoginOrRegister}
            navigationKey="Search"
            options={{
              unmountOnBlur: true,
              lazy: true,
              tabBarIcon: ({ color, focused }) => (
                <FeatherIcon name="search" color={color} size={24} />
              ),
            }}
          />
          <Screen
            name="Plus"
            component={BlackScreen}
            listeners={listners}
            options={{
              tabBarIcon: ({ color, focused }) => <MainIcon />,
            }}
          />
          <Screen
            name="Closet"
            component={ClosetStack}
            listeners={handleListenerLoginOrRegister}
            options={{
              lazy: false,
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcon name="hanger" color={color} size={24} />
              ),
            }}
          />
          <Screen
            name="Profile"
            component={ProfileStack}
            listeners={handleListenerLoginOrRegister}
            options={{
              lazy: false,
              tabBarIcon: ({ color, focused }) => (
                // user?.avatar ? (
                //   <ProfilePictureIcon avatarUrl={user.avatar} />
                // ) : (
                <FeatherIcon name="user" color={color} size={24} />
              ),
              // ),
            }}
          />
        </Group>

        <Group
          key="HideInTabMenu"
          screenOptions={{
            tabBarButton: () => null,
            lazy: true,
            unmountOnBlur: true,
          }}
        >
          <Screen name="Chat" component={ChatStack} options={{ headerShown: false }} />

          <Screen name="Offers" component={OffersStack} options={{ headerShown: false }} />
          <Screen
            name="AllSuggestions"
            component={AllSuggestions}
            options={{ title: 'SUGESTÕES DE LOOKS', headerShown: true, header: HeaderRoute }}
          />
          <Screen
            name="PostDetails"
            component={PostDetails}
            options={{ title: 'POST', headerShown: true, header: HeaderRoute }}
          />
        </Group>
      </Navigator>
    </Wrapper>
  );
}
