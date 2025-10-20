import React from 'react';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import ChatIcon from '@/assets/images/chatOutline.svg';
import { isLogged } from '@/config/mmkvStorage';
import { useToast } from '@/contexts/Toast.contexts';

import * as S from './styles';

export function ChatButton() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { show } = useToast();
  const [hasNewChat, setHasNewChat] = React.useState(false);

  const checkHasNewChat = React.useCallback(async () => {
    if (!CometChat.isInitialized()) return;
    const user = await CometChat.getLoggedinUser();
    if (!user) return;

    const count = await CometChat.getUnreadMessageCountForAllUsers(true);
    const hasMessages = Object.keys(count).length > 0;

    setHasNewChat(hasMessages);
  }, [hasNewChat]);

  function handleClick() {
    if (!CometChat.isInitialized()) {
      show({
        message: 'Chat disponível a partir de setembro',
        type: 'warning',
      });

      return;
    }

    // @ts-expect-error
    navigation.navigate('Chat');
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogged()) return;

      checkHasNewChat();

      const interval = setInterval(() => {
        checkHasNewChat();
      }, 1000 * 5);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  return (
    <S.ChatIconButton onPress={handleClick}>
      {hasNewChat && CometChat.isInitialized() ? <S.ChatIconFlag /> : <></>}
      <ChatIcon
        fill={!CometChat.isInitialized() ? theme.colors.gray05 : theme.colors.primary_black}
      />
    </S.ChatIconButton>
  );
}
