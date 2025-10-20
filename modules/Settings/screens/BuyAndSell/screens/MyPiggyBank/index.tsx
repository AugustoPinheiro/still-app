import React from 'react';

import { Tab } from '@/components/Tab';
import { Completed } from '@/modules/Settings/screens/BuyAndSell/screens/MyPiggyBank/Completed';
import { InProgress } from '@/modules/Settings/screens/BuyAndSell/screens/MyPiggyBank/InProgress';

import * as S from './styles';

const tabs = [
  { title: 'Concluídos', component: <Completed />, ref: React.createRef() },
  { title: 'Em Andamento', component: <InProgress />, ref: React.createRef() },
];

export function MyPiggyBank() {
  return (
    <S.Container>
      <Tab tabs={tabs} />
    </S.Container>
  );
}
