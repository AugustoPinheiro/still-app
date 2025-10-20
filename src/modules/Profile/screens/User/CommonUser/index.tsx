import React, { useCallback, useRef } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import * as amplitude from '@amplitude/analytics-react-native';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { getProfile, getProfiles, setProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { Menu } from '@/modules/Profile/components/Menu';
import { MenuProfiles } from '@/modules/Profile/components/MenuProfiles';
import { StyleCard } from '@/modules/Profile/components/StyleCard';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { ProfileType } from '@/types/ProfileType';

import { ProfileTabs } from '../../../components/ProfileTabs';
import { ProfileStackParamList } from '../../../routes/profile.types';
import * as S from './styles';

export function CommonUser() {
  const { expand, setBottomSheetProps } = useBottomSheet();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [changeBackground, setChangeBackground] = React.useState(false);
  const listRef = useRef<ScrollView>(null);
  const user = getProfile();
  const profiles = getProfiles();
  const [showStyleCard, setShowStyleCard] = React.useState(user?.styles?.length === 0);

  useScrollToTop(listRef);

  const {
    userData,
    isLoadingUser,
    isFetchingUser,
    selectedTab,
    isFetchingNextPagePosts,
    hasNextPagePosts,
    isFetchingPosts,
    refetchPosts,
    refetchAll,
    fetchNextPagePosts,
  } = useProfile();

  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const [refetchDebounce, setRefetchDebounce] = React.useState(true);

  function handleOpenMenu() {
    setBottomSheetProps({ id: 'MenuProfile', content: <Menu />, snapPoints: ['55%'] });
    expand();
  }

  function handleChooseProfile(profile: ProfileType) {
    if (user?.username === profile?.username) return;

    setProfile(profile);
    refetchAll();
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

  async function refetchFirstPage() {
    if (!isFetchingPosts && refetchDebounce) {
      setRefetchDebounce(false);
      await refetchPosts({ refetchPage: (page, index) => index === 0 });

      setTimeout(() => {
        setRefetchDebounce(true);
      }, 1000);
    }
  }

  function handleOpenMyAgenda() {
    amplitude.track('Click Profile Agenda');
    navigation.navigate('MyAgenda');
  }

  function handleNavigateFollows(index: number) {
    navigation.navigate('Follows', {
      username: userData?.username ?? '',
      activeTab: index,
    });
  }

  useFocusEffect(
    useCallback(() => {
      refetchAll();
    }, [])
  );

  const isCloseToBottom = useCallback(
    ({ layoutMeasurement, contentOffset, contentSize }: any) => {
      const paddingToBottom = contentSize?.height * 0.5;

      if (contentOffset.y > 62) {
        setChangeBackground(true);
      } else {
        setChangeBackground(false);
      }

      return layoutMeasurement?.height + contentOffset?.y >= paddingToBottom;
    },
    [changeBackground]
  );

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (selectedTab === 'posts') {
          if (isFetchingNextPagePosts || isFetchingPosts || !hasNextPagePosts) return;
          fetchNextPagePosts();
        }

        if (nativeEvent.contentOffset.y === 0) {
          refetchFirstPage();
        }
      }
    },
    [isFetchingNextPagePosts, isFetchingPosts, hasNextPagePosts, selectedTab]
  );

  if (isLoadingUser) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container changeBackground={changeBackground}>
      <S.ScrollContainer
        ref={listRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingUser}
            onRefresh={async () => {
              if (isFetchingPosts || isFetchingNextPagePosts) return;
              await refetchAll();
            }}
          />
        }
      >
        <S.Header>
          <S.HeaderButtonLeft onPress={handleOpenMyAgenda}>
            <S.HeaderIconLeft />
          </S.HeaderButtonLeft>
          <S.HeaderPhoto source={{ uri: userData?.avatar }} cachePolicy="disk" />
          <S.HeaderButtonRight onPress={handleOpenMenu}>
            <S.HeaderIconRight name="menu" />
          </S.HeaderButtonRight>
        </S.Header>
        <S.Content>
          <S.InfoUserContainer>
            <S.NameText>{[userData?.name, userData?.last_name].join(' ')}</S.NameText>
            <S.UsernameContainer>
              <S.ProfileButton onPress={handleOpenProfiles}>
                <S.AtNameText>@{userData?.username}</S.AtNameText>
                <S.Icon name="chevron-down" />
              </S.ProfileButton>
            </S.UsernameContainer>
          </S.InfoUserContainer>
          <S.InfoContainer>
            <S.InfoContent onPress={() => handleNavigateFollows(0)}>
              <S.NumberText>{userData?.followers}</S.NumberText>
              <S.LabelNumberText>Seguidores</S.LabelNumberText>
            </S.InfoContent>
            <S.InfoContent onPress={() => setCurrentTab(2)}>
              <S.NumberText>{userData?.clothings}</S.NumberText>
              <S.LabelNumberText>Peças no closet</S.LabelNumberText>
            </S.InfoContent>
            <S.InfoContent onPress={() => handleNavigateFollows(1)}>
              <S.NumberText>{userData?.following}</S.NumberText>
              <S.LabelNumberText>Seguindo</S.LabelNumberText>
            </S.InfoContent>
          </S.InfoContainer>

          {/* {showStyleCard && (
            <S.InfoContainer>
              <StyleCard onClose={() => setShowStyleCard(false)} />
            </S.InfoContainer>
          )} */}

          <S.TabContainer>
            <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </S.TabContainer>
        </S.Content>
      </S.ScrollContainer>
    </S.Container>
  );
}
