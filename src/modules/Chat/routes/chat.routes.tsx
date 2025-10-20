import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute as Header } from '@/components/HeaderRoute';
import { ChatContextProvider } from '@/modules/Chat/contexts/chat.contexts';
import { ChatHome } from '@/modules/Chat/screens/Home';
import { ChatMessages } from '@/modules/Chat/screens/Messages';
import { ChatUsers } from '@/modules/Chat/screens/Users';

const { Navigator, Screen } = createNativeStackNavigator<any>();

export function ChatStack({ route }: any) {
  const from = route?.params?.params?.from ?? '';

  const HeaderRoute = (props: any) => {
    if (!from) {
      return <Header {...props} />;
    }

    return <Header {...props} goBackRoute={() => props.navigation.navigate(from)} />;
  };

  return (
    <ChatContextProvider>
      <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderRoute }}>
        <Screen name="ChatHome" component={ChatHome} options={{ title: 'Chat' }} />
        <Screen name="ChatUsers" component={ChatUsers} options={{ title: 'Nova Mensagem' }} />
        <Screen
          name="CometChatMessages"
          component={ChatMessages}
        />
      </Navigator>
    </ChatContextProvider>
  );
}
