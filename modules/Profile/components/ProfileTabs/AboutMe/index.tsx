import React from 'react';
import { TouchableOpacity } from 'react-native';

import EditIcon from '@/assets/images/editIconSmaller.svg';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { ProfileType } from '@/types/ProfileType';

import { UpdateBio } from '../../UpdateBio';
import * as S from './styles';

type PostsSavesProps = {
  userData: ProfileType | undefined;
  refetchUser: () => void;
};

export function AboutMe({ userData, refetchUser }: PostsSavesProps) {
  const { expand, setBottomSheetProps } = useBottomSheet();

  function handleUpdateBio() {
    setBottomSheetProps({
      id: 'MenuReportInput',
      content: <UpdateBio user={userData} refetchUser={refetchUser} />,
      snapPoints: ['60%'],
    });
    expand();
  }
  return (
    <S.Container>
      <S.Row>
        <S.BioTitle>Bio</S.BioTitle>
        <TouchableOpacity onPress={handleUpdateBio}>
          <EditIcon />
        </TouchableOpacity>
      </S.Row>
      <S.BioText>{userData?.bio ?? 'Preencha aqui a sua bio'}</S.BioText>
    </S.Container>
  );
}
