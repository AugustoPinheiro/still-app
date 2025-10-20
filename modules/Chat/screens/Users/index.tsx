import React from 'react';

import { CometChatUserList } from '@/components/cometchat-pro-react-native-ui-kit/CometChatWorkspace/src';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

export function ChatUsers({ navigation, route }: GenericPageProp) {
  const { params } = route;
  const text = params?.text;

  return (
    <S.Container>
      <CometChatUserList
        friendsOnly
        navigation={navigation}
        onItemClick={(item) => navigation.navigate('CometChatMessages', { item, text })}
      />
    </S.Container>
  );
}
