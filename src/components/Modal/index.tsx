import React from 'react';

import * as S from './styles';

type ModalProps = {
  children: React.ReactNode;
  full?: boolean;
  onClickOutside?: () => void;
  closeOnClick?: boolean;
};

export function Modal({ children, full = false, onClickOutside, closeOnClick }: ModalProps) {
  return (
    <S.Wrapper>
      <S.Outside onPress={onClickOutside} />
      <S.Container full={full} onPress={() => (closeOnClick ? onClickOutside?.() : null)}>
        <S.Modal full={full}>{children}</S.Modal>
      </S.Container>
    </S.Wrapper>
  );
}
