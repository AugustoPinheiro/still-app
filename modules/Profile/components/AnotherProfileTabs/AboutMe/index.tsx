import React from 'react';

import { ProfileAnotherUserType } from '@/types/ProfileType';

import * as S from './styles';

type PostsSavesProps = {
  userData: ProfileAnotherUserType | undefined;
};

export function AboutMe({ userData }: PostsSavesProps) {
  return (
    <S.Container>
      <S.BioText>{userData?.bio}</S.BioText>
    </S.Container>
  );
}
