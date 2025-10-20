import React from 'react';

import { OneSignal } from 'react-native-onesignal';
import { CometChat } from '@cometchat-pro/react-native-chat';
import * as amplitude from '@amplitude/analytics-react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import AccountIcon from '@/assets/images/accountIcon.svg';
import ArchiveddIcon from '@/assets/images/archivedIcon.svg';
import ChatIcon from '@/assets/images/chatIcon.svg';
import DollarCoinIcon from '@/assets/images/dollarCoinIcon.svg';
import LogoutIcon from '@/assets/images/logoutIcon.svg';
import QuestionIcon from '@/assets/images/questionIcon.svg';
import { clearStorage, getProfile } from '@/config/mmkvStorage';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { type ProfileStackParamList } from '@/modules/Profile/routes/profile.types';

import * as S from './styles';

type TMenuNavigationProps = NativeStackNavigationProp<ProfileStackParamList, 'User'>;

export function Menu() {
  const { close } = useBottomSheet();
  const theme = useTheme();
  const navigation = useNavigation<TMenuNavigationProps>();

  const user = getProfile();

  const handleNavigate = (screen: string) => {
    close();
    // @ts-expect-error
    navigation.navigate('Settings', { screen });
  };

  const handleNavigateArchive = () => {
    close();
    navigation.navigate('Archive' as never);
  };

  const handleLogout = async () => {
    amplitude.track('Logout');
    clearStorage();
    CometChat.logout();
    OneSignal.logout();
    amplitude.setUserId(undefined);
    amplitude.reset();

    const routes = {
      index: 0,
      routes: [{ name: 'Login' }],
    };

    navigation.dispatch(CommonActions.reset(routes));
  };

  function handlePsInvites() {
    close();
    // @ts-expect-error
    navigation.navigate('Feed', { screen: 'PsInvites' });
  }

  const handleNavigateOrders = () => {
    close();
    navigation.navigate('Orders' as never);
  };

  const handleNavigateMyServices = () => {
    close();
    navigation.navigate('MyServices' as never);
  };

  return (
    <S.Container>
      <S.Option
        onPress={() => {
          amplitude.track('Click My Account');
          handleNavigate('MyAccount');
        }}
      >
        <AccountIcon width={24} height={24} color={theme?.colors.gray04} />
        <S.OptionText>Minha conta</S.OptionText>
      </S.Option>

        {user?.username && user.profile_type == 'common' ?
          <>
          <S.Option
            onPress={() => {
              handlePsInvites();
            }}
          >
            <S.Icon name="bell-outline" />
            <S.OptionText>Convites de personal stylist</S.OptionText>
          </S.Option>

          <S.Option
            onPress={() => {
              handleNavigateMyServices();
            }}
          >
            <S.Icon name="account-star-outline" />
            <S.OptionText>Agendamentos</S.OptionText>
          </S.Option>

          <S.Option
            onPress={() => {
              handleNavigateOrders();
            }}
          >
            <DollarCoinIcon width={24} height={24} color={theme?.colors.gray04} />
            <S.OptionText>Pagamentos</S.OptionText>
          </S.Option>
          </> : <></>
        }

      <S.Option
        onPress={() => {
          handleNavigateArchive();
        }}
      >
        <ArchiveddIcon width={24} height={24} color={theme?.colors.gray04} />
        <S.OptionText>Itens Arquivados</S.OptionText>
      </S.Option>

      <S.Option
        onPress={() => {
          amplitude.track('Click Buy And Sell');
          handleNavigate('BuyAndSell');
        }}
      >
        <DollarCoinIcon width={24} height={24} color={theme?.colors.gray04} />
        <S.OptionText>Compra e venda</S.OptionText>
      </S.Option>

      <S.Option
        onPress={() => {
          amplitude.track('Click Faq');
          handleNavigate('FAQ');
        }}
      >
        <QuestionIcon width={24} height={24} color={theme?.colors.gray04} />
        <S.OptionText>DÚVIDAS FREQUENTES</S.OptionText>
      </S.Option>

      <S.Option
        onPress={() => {
          amplitude.track('Click Contact');
          handleNavigate('ContactUs');
        }}
      >
        <ChatIcon
          width={20}
          height={20}
          color={theme?.colors.gray04}
          style={{ marginLeft: 2, marginRight: 2 }}
        />
        <S.OptionText>FALE COM A Still </S.OptionText>
      </S.Option>

      <S.Option onPress={handleLogout}>
        <LogoutIcon
          width={20}
          height={20}
          color={theme?.colors.gray04}
          style={{ marginLeft: 2, marginRight: 2 }}
        />
        <S.OptionText>Sair</S.OptionText>
      </S.Option>
    </S.Container>
  );
}
