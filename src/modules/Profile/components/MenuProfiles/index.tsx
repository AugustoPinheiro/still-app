import React from 'react';
import { OneSignal } from 'react-native-onesignal';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import PlusIcon from '@/assets/images/plusIcon.svg';
import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { getProfiles } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { type ProfileStackParamList } from '@/modules/Profile/routes/profile.types';
import { ProfileType } from '@/types/ProfileType';

import * as S from './styles';

const IS_DEV = EXPO_PUBLIC_IS_DEV;
type TMenuNavigationProps = NativeStackNavigationProp<ProfileStackParamList, 'User'>;

type Props = {
  onChooseProfile?: (profile: ProfileType) => void;
};

export function MenuProfiles({ onChooseProfile }: Props) {
  const { close } = useBottomSheet();
  const profiles = getProfiles();
  const navigation = useNavigation<TMenuNavigationProps>();
  const theme = useTheme();

  const handleNavigateCreateProfile = () => {
    close();

    // @ts-expect-error
    navigation.navigate('Discovery', {
      screen: 'ChooseProfile',
      params: { isCreateProfile: true },
    });
  };

  function getMockUser(username: string) {
    switch (username) {
      case 'teste5':
        return 21;
      case 'teste6':
        return 25;
      case 'mylycystore':
        return 13;
      case 'mylycy':
        return 4;
      default:
        return 6;
    }
  }

  const handleChangeProfile = (profile: ProfileType) => {
    close();
    CometChat.logout();
    OneSignal.logout();

    if (IS_DEV) {
      const mockUser = getMockUser(profile?.username);
      CometChat.login(mockUser, COMETCHAT_AUTH_KEY);
    } else {
      CometChat.login(profile?.id, COMETCHAT_AUTH_KEY);
    }

    OneSignal.login(profile.uuid);
    onChooseProfile?.(profile);
  };

  return (
    <S.Container>
      {profiles?.map((profile: ProfileType) => (
        <S.Option key={profile?.id} onPress={() => handleChangeProfile(profile)}>
          <S.ProfilePhoto source={{ uri: profile?.avatar }} cachePolicy="disk" />
          <S.OptionText>{`@${profile.username}`}</S.OptionText>
        </S.Option>
      ))}

      <S.Option onPress={handleNavigateCreateProfile}>
        <PlusIcon width={24} height={24} color={theme?.colors.primary_black} />
        <S.OptionText>Adicionar novo perfil</S.OptionText>
      </S.Option>
    </S.Container>
  );
}
