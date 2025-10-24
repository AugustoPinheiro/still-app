import React, { useEffect } from "react";

import { CometChat } from "@cometchat-pro/react-native-chat";

import { Loading } from "@/components/Loading";
import { CometChatConversationListWithMessages } from "@/components/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src";
import { COMETCHAT_AUTH_KEY } from "@/config/cometChat";
import { getProfile } from "@/config/mmkvStorage";
import { useToast } from "@/contexts/Toast.contexts";
import { useChat } from "@/modules/Chat/contexts/chat.contexts";
import { GenericPageProp } from "@/types/GenericPageProp";

import * as S from "./styles";

export function ChatHome({ navigation }: GenericPageProp) {
  const { setLocalUser, MOCK_UID, localUser } = useChat();
  const { show } = useToast();
  const [localLoading, setLocalLoading] = React.useState(true);
  const profile = getProfile();

  async function login() {
    const loggedUser = await CometChat.getLoggedinUser();

    if (!loggedUser) {
      const user = await CometChat.login(
        profile?.uuid ?? MOCK_UID,
        COMETCHAT_AUTH_KEY
      );
      setLocalUser(user);
    } else {
      setLocalUser(loggedUser);
    }
  }

  async function fetchLogin() {
    try {
      await login();
      setLocalLoading(false);
    } catch (error) {
      show({
        message: "Erro ao carregar mensagens",
        type: "error",
      });

      navigation.goBack();
    } finally {
      setLocalLoading(false);
    }
  }

  useEffect(() => {
    fetchLogin();
  }, []);

  if (!localUser && !localLoading) {
    navigation.goBack();
  }

  if (localLoading) {
    return (
      <S.Container>
        <Loading hasBackground={false} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.TalkContainer>
        <S.TalkText>CONVERSAS</S.TalkText>
        <S.TalkButton onPress={() => navigation.navigate("ChatUsers")}>
          <S.TalkIcon name="plus" />
        </S.TalkButton>
      </S.TalkContainer>
      <CometChatConversationListWithMessages navigation={navigation} />
    </S.Container>
  );
}
