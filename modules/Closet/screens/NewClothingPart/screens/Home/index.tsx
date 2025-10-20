import React, { useEffect } from 'react';

import { NavigationProp } from '@react-navigation/native';

import { Tab } from '@/components/Tab';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { CommunityClothes } from '@/modules/Closet/screens/NewClothingPart/screens/CommunityClothes';
import { GoogleImages } from '@/modules/Closet/screens/NewClothingPart/screens/GoogleImages';
import { NewClothingPartGallery } from '@/modules/Closet/screens/NewClothingPart/screens/NewClothingPartGallery';

import * as S from './styles';

const tabs = [
  { title: 'Câmera', component: <NewClothingPartGallery />, ref: React.createRef() },
  { title: 'Peças cadastradas', component: <CommunityClothes />, ref: React.createRef() },
  { title: 'Rede', component: <GoogleImages />, ref: React.createRef() },
];

export function NewClothingPartHome({ navigation }: { navigation: NavigationProp<any> }) {
  const { close } = useBottomSheet();

  useEffect(() => {
    close();
  }, []);

  return (
    <S.Wrapper>
      <S.Container>
        <Tab tabs={tabs} offset={19} />
      </S.Container>
    </S.Wrapper>
  );
}
