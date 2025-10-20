import React from 'react';

import { Loading } from '@/components/Loading';
import { Tab } from '@/components/Tab';
import { useAnotherProfile } from '@/modules/Profile/contexts/anotherProfile.contexts';
import { InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import { AboutMe } from './AboutMe';
import { Closet } from './Closet';
import { Posts } from './Posts';
import { Saves } from './Saves';

interface ProfileTabsProps {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

export function AnotherProfileTabs({ currentTab = 0, setCurrentTab }: ProfileTabsProps) {
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
    component: <Posts posts={posts} />,
    ref: React.createRef(),
  };

  const renderTabs = () => {
    if (userData?.profile_type === 'professional') {
      return [
        postsTab,
        {
          title: 'Sobre mim',
          component: <AboutMe userData={userData} />,
          ref: React.createRef(),
        }
      ] as any;
    }

    if (userData?.profile_type === 'store') {
      return [
        postsTab,
        {
          title: 'Catálogo',
          component: (
            <Closet
              closet={closetClothing as InfiniteQueryDataCloset}
              name={[userData?.name, userData?.last_name].join(' ')}
              isTab
            />
          ),
          ref: React.createRef(),
        },
      ];
    }

    return [
      postsTab,
      {
        title: 'Salvos',
        component: <Saves postsSaved={postsSaved as any} />,
        ref: React.createRef(),
      },
      {
        title: 'Closet',
        component: (
          <Closet
            closet={closetClothing as InfiniteQueryDataCloset}
            name={[userData?.name, userData?.last_name].join(' ')}
            isTab
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
      onTabChange={(index) => setCurrentTab(index)}
      tabs={renderTabs()}
      offset={33}
    />
  );
}
