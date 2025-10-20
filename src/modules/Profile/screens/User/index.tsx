import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';

import { useFocusEffect, useScrollToTop } from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { useProfile } from '@/modules/Profile/contexts/profile.contexts';

import { CommonUser } from './CommonUser';
import { ProfessionalUser } from './ProfessionalUser';
import { StoreUser } from './StoreUser';

export function User() {
  const listRef = useRef<ScrollView>(null);
  useScrollToTop(listRef);
  const { userData, isLoadingUser, refetchUser } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [])
  );

  const renderContent = () => {
    if (!userData) return <></>;
    if (userData.profile_type === 'professional') return <ProfessionalUser />;
    if (userData.profile_type === 'store') return <StoreUser />;
    return <CommonUser />;
  };

  if (isLoadingUser) {
    return <Loading hasBackground={false} />;
  }

  return renderContent();
}
