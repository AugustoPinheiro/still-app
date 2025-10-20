import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import { blockUserbyUsername } from '../../services/anotherpersonprofile.services';
import { BlockConfirmation } from '../BlockConfirmation';
import { MenuReport } from '../MenuReport';
import * as S from './styles';

type MenuProps = {
  username: string;
  id: string;
};

export function MenuAnotherUser({ username, id }: MenuProps) {
  const { expand, setBottomSheetProps, close } = useBottomSheet();
  const navigation = useNavigation<any>();

  function handleOpenMenu() {
    setBottomSheetProps({
      id: 'MenuBlockUserProfile',
      content: (
        <BlockConfirmation
          close={close}
          handleConfirm={() => {
            blockUserbyUsername(username);
            close();
            navigation.goBack();
          }}
        />
      ),
      snapPoints: ['30%'],
    });
    expand();
  }

  function handleOpenMenuReport() {
    setBottomSheetProps({
      id: 'MenuReport',
      content: <MenuReport user={id} type="profile" />,
      snapPoints: ['95%'],
    });
    expand();
  }

  return (
    <S.Container>
      <S.Option onPress={handleOpenMenuReport}>
        <S.OptionText>Denunciar perfil</S.OptionText>
      </S.Option>
      <S.Divider />
      <S.Option
        onPress={() => {
          handleOpenMenu();
        }}
      >
        <S.OptionText>Bloquear perfil</S.OptionText>
      </S.Option>
    </S.Container>
  );
}
