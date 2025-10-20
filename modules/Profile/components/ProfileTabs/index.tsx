import React from 'react';

import * as amplitude from '@amplitude/analytics-react-native';

import { Tab } from '@/components/Tab';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';
import { InfiniteQueryDataCloset } from '@/types/ClosetClothingType';

import { AboutMe } from './AboutMe';
import { Closet } from './Closet';
import { Posts } from './Posts';
import { Saves } from './Saves';

interface ProfileTabsProps {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  isStore?: boolean;
}

export function ProfileTabs({ currentTab = 0, setCurrentTab, isStore }: ProfileTabsProps) {
  const { posts, postsSaved, closetClothing, userData, refetchUser } = useProfile();

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
          component: <AboutMe userData={userData} refetchUser={refetchUser} />,
          ref: React.createRef(),
        },
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
      ] as any;
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

  const handleOnTabChange = (index: number) => {
    const tabs = renderTabs();
    if (tabs[index].title === 'Salvos') {
      amplitude.track('Click Profile Saved');
    } else {
      if (tabs[index].title === 'Closet') {
        amplitude.track('Click Profile Closet');
      } else {
        if (tabs[index].title === 'Posts') {
          amplitude.track('Click Profile Posts');
        }
      }
    }

    setCurrentTab(index);
  };

  return (
    <Tab
      key={currentTab}
      activiteTab={currentTab}
      onTabChange={handleOnTabChange}
      tabs={renderTabs()}
      offset={33}
    />
  );
}
