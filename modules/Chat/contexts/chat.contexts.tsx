import React, { createContext, useContext } from 'react';

import { CometChat } from '@cometchat-pro/react-native-chat';

import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { getUserData } from '@/config/mmkvStorage';

type ChatContextType = {
  localUser: CometChat.User | undefined;
  setLocalUser: React.Dispatch<React.SetStateAction<CometChat.User | undefined>>;
  isLoading: boolean;
  MOCK_UID?: number;
};

type Props = {
  children: React.ReactNode;
};

const IS_DEV = EXPO_PUBLIC_IS_DEV;

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatContextProvider');
  }
  return context;
};

const ChatContextProvider = ({ children }: Props) => {
  const [localUser, setLocalUser] = React.useState<CometChat.User>();

  const user = getUserData();

  function getMockUser() {
    switch (user?.username) {
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

  const MOCK_UID = IS_DEV ? getMockUser() : user?.id;

  return (
    <ChatContext.Provider value={{ localUser, setLocalUser, MOCK_UID }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, useChat };
