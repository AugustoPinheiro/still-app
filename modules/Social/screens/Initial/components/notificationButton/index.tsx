import React from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { isLogged } from '@/config/mmkvStorage';
import { getNotificationsCount } from '@/modules/Social/services/social.services';

import * as S from './styles';

export function NotificationButton() {
  const navigation = useNavigation();

  const { data: notifications, refetch: refetchNotifications } = useQuery({
    queryKey: ['notificationsCount'],
    queryFn: getNotificationsCount,
  });

  const hasNewNotification = !!notifications && notifications > 0;

  const handleNavigationNotifications = () => {
    // @ts-expect-error
    navigation.navigate('Notifications');
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogged()) return;
      refetchNotifications();

      const interval = setInterval(() => {
        refetchNotifications();
      }, 1000 * 5);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  return (
    <S.NotificationContainer onPress={handleNavigationNotifications}>
      {hasNewNotification ? <S.IconFlag /> : <></>}
      <S.Icon name="bell-outline" />
    </S.NotificationContainer>
  );
}
