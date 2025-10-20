import React from 'react';

import * as S from './styles';

type ProfilePictureIconProps = {
  avatarUrl: string;
};

export function ProfilePictureIcon({ avatarUrl }: ProfilePictureIconProps) {
  return (
    <S.Container>
      <S.PictureImage source={{ uri: avatarUrl }} recyclingKey={avatarUrl} cachePolicy="disk" />
    </S.Container>
  );
}
