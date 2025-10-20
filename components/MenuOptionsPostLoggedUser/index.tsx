import React from 'react';

import { useTheme } from 'styled-components';

import ArchiveddIcon from '@/assets/images/archivedIcon.svg';
import TrashIcon from '@/assets/images/trashIcon.svg';

import * as S from './styles';

type MenuProps = {
  handleArchive: () => void;
  handleDelete: () => void;
  handleUnarchive?: () => void;
  archived?: boolean;
};

export function MenuOptionsPostLoggedUser({
  handleArchive,
  handleDelete,
  handleUnarchive,
  archived,
}: MenuProps) {
  const theme = useTheme();

  return (
    <S.Container>
      {archived ? (
        <>
          <S.Button onPress={handleDelete}>
            <TrashIcon
              style={{ marginRight: 16 }}
              width={24}
              height={24}
              color={theme?.colors.gray04}
            />
            <S.ButtonTitle>Deletar Post</S.ButtonTitle>
          </S.Button>

          <S.Divider />
          <S.Button onPress={handleUnarchive}>
            <ArchiveddIcon
              style={{ marginRight: 16 }}
              width={24}
              height={24}
              color={theme?.colors.gray04}
            />
            <S.ButtonTitle>Desarquivar Post</S.ButtonTitle>
          </S.Button>
        </>
      ) : (
        <>
          <S.Button onPress={handleDelete}>
            <TrashIcon
              style={{ marginRight: 16 }}
              width={24}
              height={24}
              color={theme?.colors.gray04}
            />
            <S.ButtonTitle>Deletar Post</S.ButtonTitle>
          </S.Button>

          <S.Divider />
          <S.Button onPress={handleArchive}>
            <ArchiveddIcon
              style={{ marginRight: 16 }}
              width={24}
              height={24}
              color={theme?.colors.gray04}
            />
            <S.ButtonTitle>Arquivar Post</S.ButtonTitle>
          </S.Button>
        </>
      )}
    </S.Container>
  );
}
