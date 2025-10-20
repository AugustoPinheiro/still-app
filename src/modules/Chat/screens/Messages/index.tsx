import React, { useEffect } from 'react';

import { CometChat } from '@cometchat-pro/react-native-chat';

import { Loading } from '@/components/Loading';
import { CometChatMessages } from '@/components/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';
import { COMETCHAT_AUTH_KEY } from '@/config/cometChat';
import { useToast } from '@/contexts/Toast.contexts';
import { useChat } from '@/modules/Chat/contexts/chat.contexts';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

export function ChatMessages({ route, navigation }: GenericPageProp) {
  const { show } = useToast();
  const { MOCK_UID } = useChat();
  const [localUser, setLocalUser] = React.useState(null);

  const params = route?.params;
  const item = params?.item;
  const text = params?.text;

  if (!item) {
    show({
      message: 'Erro ao iniciar conversa  usuário',
      type: 'error',
    });

    navigation.goBack();
  }

  async function login() {
    const loggedUser = await CometChat.getLoggedinUser();

    if (!loggedUser) {
      const user = await CometChat.login(MOCK_UID, COMETCHAT_AUTH_KEY);
      setLocalUser(user);
    } else {
      setLocalUser(loggedUser);
    }
  }

  useEffect(() => {
    login();
  }, []);

  if (!localUser) {
    return <Loading hasBackground={false} />;
  }

  return (
    <S.Container>
      <CometChatMessages
        type="user"
        item={item}
        text={text}
        loggedInUser={localUser}
        actionGenerated={() => {}}
        viewdetail={false}
        audioCall={false}
        videoCall={false}
      />
    </S.Container>
  );
}
