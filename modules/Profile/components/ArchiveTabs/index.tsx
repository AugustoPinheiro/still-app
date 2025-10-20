import React from 'react';

import { Loading } from '@/components/Loading';
import { Tab } from '@/components/Tab';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';

import { Posts } from './Posts';

export function ArchiveTabs() {
  const { archivedPosts, isLoadingArchivedPosts } = useProfile();

  if (isLoadingArchivedPosts) {
    return <Loading hasBackground={false} />;
  }

  return (
    <Tab
      tabs={
        [
          {
            title: 'Posts',
            component: <Posts posts={archivedPosts} archived />,
            ref: React.createRef(),
          },
          // {
          //   title: 'Closet',
          //   component: (
          //     <Closet
          //       closet={closetClothing as InfiniteQueryDataCloset}
          //       name={[userData?.name, userData?.last_name].join(' ')}
          //       isTab
          //     />
          //   ),
          //   ref: React.createRef(),
          // },
        ] as any
      }
      offset={33}
    />
  );
}
