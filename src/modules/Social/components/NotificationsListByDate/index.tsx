import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { getProfileByUsername } from '@/modules/Profile/services/profile.services';

import { NotificationsRow } from '../NotificationsRow';
import * as S from './styles';

export interface NotificationType {
  text: string;
  profile_id: number;
  image: string;
  related_profiles: string[];
  type: string;
  object_id: number;
  cta: [
    {
      url: string;
      text: string;
      primary: boolean;
    },
  ];
  id: number;
  seen: boolean;
  created_at: string;
  people: [
    {
      username: string;
      avatar: string;
    },
  ];
}

export interface INotificationsProps {
  title: string;
  notifications: NotificationType[];
}

export function NotificationsListByDate({ title, notifications }: INotificationsProps) {
  const { isLoading } = useQuery({
    queryKey: ['profilebyUsername'],
    queryFn: getProfileByUsername,
  });

  if (isLoading) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <S.Description>{title}</S.Description>
      <NotificationsRow notification={notifications} />
    </S.Container>
  );
}
