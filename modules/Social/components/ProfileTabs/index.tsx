import React from 'react';

import { Loading } from '@/components/Loading';
import { Tab } from '@/components/Tab';
import { AboutMe } from '@/modules/Profile/components/AnotherProfileTabs/AboutMe';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import { Closet } from './Closet';
import { Posts } from './Posts';
import { Saves } from './Saves';

interface ProfileTabsProps {
  currentTab?: number;
  setCurrentTab?: React.Dispatch<React.SetStateAction<number>>;
  isStore?: boolean;
}

export function ProfileTabs({ currentTab = 0, setCurrentTab, isStore }: ProfileTabsProps) {
  const {
    isLoadingUser,
    isLoadingPosts,
    isLoadingSaved,
    isLoadingClosetClothing,
    posts,
    postsSaved,
    closetClothing,
    userData,
  } = useAnotherProfile();

  const postsTab = {
    title: 'Posts',
    component: <Posts posts={posts} key={`posts_${userData?.username}`} />,
    ref: React.createRef(),
  };

  const renderTabs = () => {
    if (userData?.profile_type === 'professional') {
      return [
        postsTab,
        {
          title: 'Sobre mim',
          component: <AboutMe userData={userData} key={`about_me_${userData?.username}`} />,
          ref: React.createRef(),
        },
      ] as any;
    }

    if (isStore) {
      return [
        postsTab,
        {
          title: 'Catálogo',
          component: (
            <Closet
              key={`closet_${userData?.username}`}
              closet={closetClothing as InfiniteQueryDataCloset}
              name={[userData?.name, userData?.last_name].join(' ')}
              isTab
              user={userData}
            />
          ),
          ref: React.createRef(),
        },
      ] as any;
    }

    return [
      postsTab,
      {
        title: 'Salvos',
        component: <Saves postsSaved={postsSaved as any} key={`saves_${userData?.username}`} />,
        ref: React.createRef(),
      },
      {
        title: 'Closet',
        component: (
          <Closet
            key={`closet_${userData?.username}`}
            closet={closetClothing as InfiniteQueryDataCloset}
            name={[userData?.name, userData?.last_name].join(' ')}
            isTab
            user={userData}
          />
        ),
        ref: React.createRef(),
      },
    ] as any;
  };

  if (isLoadingUser || isLoadingPosts || isLoadingSaved || isLoadingClosetClothing) {
    return <Loading hasBackground={false} />;
  }

  return (
    <Tab
      key={currentTab}
      activiteTab={currentTab}
      onTabChange={(index) => setCurrentTab?.(index)}
      tabs={renderTabs()}
      offset={33}
    />
  );
}
