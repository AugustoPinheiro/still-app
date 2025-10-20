import React from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { SocialFeedType } from '@/types/SocialFeedType';

import * as S from './styles';

import * as amplitude from '@amplitude/analytics-react-native';

type OfferMenuProps = {
  post: SocialFeedType;
  onGoToStore?: (post: SocialFeedType) => void;
  hasLink?: boolean;
};

export function OfferMenu({ post, onGoToStore, hasLink }: OfferMenuProps) {
  const navigation = useNavigation<NavigationProp<any>>();
  const { close } = useBottomSheet();

  function handleOffer() {
    amplitude.track('Click Make Offer');
    navigation.navigate('SocialOffer', { post });
    close();
  }

  return (
    <S.Container>
      <S.Button onPress={handleOffer}>
        <S.ButtonTitle>Fazer oferta</S.ButtonTitle>
      </S.Button>

      {hasLink ? (
        <>
          <S.Divider />
          <S.Button onPress={() => onGoToStore?.(post)}>
            <S.ButtonTitle>Visitar Loja</S.ButtonTitle>
          </S.Button>
        </>
      ) : (
        <></>
      )}

      <S.Divider />

      <S.Button onPress={close}>
        <S.ButtonTitle>Cancelar</S.ButtonTitle>
      </S.Button>
    </S.Container>
  );
}
