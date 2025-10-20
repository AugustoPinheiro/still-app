import React from 'react';

import { Tab } from '@/components/Tab';
import { Accepted } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Accepted';
import { Completed } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Completed';
import { Open } from '@/modules/Settings/screens/BuyAndSell/screens/MyOffers/Open';

import * as S from './styles';

const tabs = [
  { title: 'Aberto', component: <Open />, ref: React.createRef() },
  { title: 'Em Andamento', component: <Accepted />, ref: React.createRef() },
  { title: 'Concluído', component: <Completed />, ref: React.createRef() },
];

export function MyOffers() {
  return (
    <S.Container>
      <Tab tabs={tabs} />
    </S.Container>
  );
}
