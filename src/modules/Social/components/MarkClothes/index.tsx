import React from 'react';

import { useTheme } from 'styled-components/native';

import { Tab } from '@/components/Tab';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { Clothings } from '@/modules/Social/components/MarkClothes/Clothings';
import { ISelectClothing } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';

import * as S from './styles';

type Params = {
  setSelectedClothes: React.Dispatch<React.SetStateAction<ISelectClothing[]>>;
  pos: { x: number; y: number };
};

export function MarkClothes({ setSelectedClothes, pos }: Params) {
  const { close } = useBottomSheet();
  const theme = useTheme();

  const tabs = [
    {
      title: 'Peças',
      component: <Clothings setSelectedItem={setSelectedClothes} pos={pos} />,
      ref: React.createRef(),
    },
    // {
    //   title: 'Combinações',
    //   component: <Looks setSelectedItem={setSelectedClothes} />,
    //   ref: React.createRef(),
    // },
  ];

  return (
    <S.Container>
      <S.ContentLook>
        <S.ArrowBackButtonContainer onPress={close}>
          <S.Icon name="arrow-left" size={theme.fontSizes.XL} />
        </S.ArrowBackButtonContainer>
        <S.AtNameText>Meus Looks</S.AtNameText>
      </S.ContentLook>
      <Tab tabs={tabs} offset={20} />
    </S.Container>
  );
}
