import React from 'react';
import { Linking } from 'react-native';

import { Modal } from '@/components/Modal';

import * as S from './styles';

type Item = {
  clothing_id: number;
  pos_x: number;
  pos_y: number;
  clothing: {
    title: string;
    image: string;
    link?: string | undefined;
    is_monetized: boolean;
    price: number;
  };
};

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  postLinks: Item[] | undefined;
};
export function ModalClothings({ showModal, setShowModal, postLinks }: Props) {
  if (!showModal) return <></>;

  async function handleClick(item: Item) {
    if (!item.clothing.link) return;
    await Linking.openURL(item.clothing.link);
  }

  return (
    <Modal onClickOutside={() => setShowModal(false)}>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>Peças disponíveis</S.ModalTitle>
          <S.ModalSubtitle>Escolha a peça que você deseja visualizar</S.ModalSubtitle>
        </S.ModalHeader>
        <S.ModalImageContainer>
          {postLinks?.map((item) => (
            <S.ModalPartsContainer
              key={String(item.clothing_id)}
              onPress={async () => await handleClick(item)}
            >
              <S.ModalPartsImage source={{ uri: item.clothing.image }} cachePolicy="disk" />
            </S.ModalPartsContainer>
          ))}
        </S.ModalImageContainer>
      </S.ModalContainer>
    </Modal>
  );
}
