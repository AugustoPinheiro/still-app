import React from 'react';

import { Clothings } from '@/components/Post/Marks/Clothings';
import { People } from '@/components/Post/Marks/People';
import { Tab } from '@/components/Tab';
import { SocialPostType } from '@/types/SocialPostType';

import * as S from './styles';

type Props = {
  post: SocialPostType;
};

export function Marks({ post }: Props) {
  const tabs = [];

  if (post.people?.length > 0) {
    tabs.push({
      title: 'Pessoas',
      component: <People people={post.people} />,
      ref: React.createRef(),
    });
  }

  if (post.clothing?.length > 0) {
    tabs.push({
      title: 'Peças',
      component: <Clothings clothings={post.clothing} />,
      ref: React.createRef(),
    });
  }

  return (
    <S.Container>
      <Tab tabs={tabs} />
    </S.Container>
  );
}
