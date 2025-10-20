import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import { NavigationProp, useNavigation, useScrollToTop } from '@react-navigation/native';

import Logo from '@/assets/images/logo.svg';
import { EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { PostsList } from '@/modules/Social/screens/Initial/components/PostsList';
import { ChatButton } from '@/modules/Social/screens/Initial/components/chatButton';
import { ModalClothings } from '@/modules/Social/screens/Initial/components/modalClothings';
import { NotificationButton } from '@/modules/Social/screens/Initial/components/notificationButton';
import { useInitialData } from '@/modules/Social/screens/Initial/useData';
import { GenericPageProp } from '@/types/GenericPageProp';

import { SocialStackParamList } from '../../routes/social.types';
import * as S from './styles';

type SocialHomeProps = GenericPageProp & {
  route: {
    params: {
      screenTo: string;
    };
  };
};

const IS_DEV = EXPO_PUBLIC_IS_DEV;

export function Initial({ route }: SocialHomeProps) {
  const listRef = useRef<FlatList<any>>(null);
  const navigation = useNavigation<NavigationProp<SocialStackParamList>>();
  const { params } = route;
  const screenTo = params?.params?.screenTo;

  const { firstLoading, setFirstLoading, setShowModal, handleGoToStore, showModal, postLinks } =
    useInitialData();

  useScrollToTop(listRef as any);

  useEffect(() => {
    if (screenTo && firstLoading) {
      const paramsRedirect = params?.params?.params;

      navigation.navigate(screenTo, {
        screen: paramsRedirect?.screen,
        params: paramsRedirect?.params,
      });
    }

    setFirstLoading(false);
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.LogoContainer>
          <Logo width={64} height={24} />
          {IS_DEV ? <S.HomologText>Homologação</S.HomologText> : <></>}
        </S.LogoContainer>
        <S.IconsContainer>
          <NotificationButton />
          <ChatButton />
        </S.IconsContainer>
      </S.Header>
      <S.Content>
        <PostsList listRef={listRef} key="posts_list" handleGoToStore={handleGoToStore} />
      </S.Content>
      <ModalClothings showModal={showModal} setShowModal={setShowModal} postLinks={postLinks} />
    </S.Container>
  );
}
