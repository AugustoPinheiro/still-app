import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  RouteProp,
  StackActions,
  TabActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Loading } from '@/components/Loading';
import { getProfile } from '@/config/mmkvStorage';
import { useAnotherProfile } from '@/modules/Social/contexts/anotherProfile.contexts';
import { StoreUser } from '@/modules/Social/screens/User/StoreUser';

import { SocialStackParamList } from '../../routes/social.types';
import { CommonUser } from './CommonUser';
import { ProfessionalUser } from './ProfessionalUser';

export function User() {
  const user = getProfile();
  const navigation = useNavigation();

  const { userData, isLoadingUser, setUsername, isFetchingUser } = useAnotherProfile();

  const { params } = useRoute<RouteProp<SocialStackParamList, 'AnotherUserProfile'>>();

  const { username } = params;

  useEffect(() => {
    if (user?.username === username) {
      navigation.dispatch(StackActions.pop(1));
      navigation.dispatch(TabActions.jumpTo('Profile'));
    }
    username && setUsername(username);
  }, [username]);

  const renderContent = () => {
    if (!userData && !isLoadingUser && !isFetchingUser) {
      return (
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Usuario não encontrado</Text>
        </View>
      );
    }

    if (userData?.profile_type === 'professional') {
      return <ProfessionalUser key={`professional_user_${username}`} />;
    }

    if (userData?.profile_type === 'store') {
      return <StoreUser key={`store_user_${username}`} />;
    }

    return <CommonUser username={username} key={`common_user_${username}`} />;
  };

  if (isLoadingUser || isFetchingUser) {
    return <Loading hasBackground={false} />;
  }

  return renderContent();
}
