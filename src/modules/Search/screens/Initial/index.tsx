import React from 'react';

import * as amplitude from '@amplitude/analytics-react-native';

import { Tab } from '@/components/Tab';
import { HighlightSearch } from '@/modules/Search/components/HighlightSearch';
import { ProductSearch } from '@/modules/Search/components/ProductSearch';

import { PersonSearch } from '../../components/PersonSearch';
import { StoreSearch } from '../../components/StoreSearch';
import * as S from './styles';
import { PersonalStylistSearch } from '../../components/ProfessionalSearch';

const tabs = [
  {
    title: 'Explorar',
    component: <HighlightSearch />,
    ref: React.createRef(),
  },
  {
    title: 'Pessoas',
    component: <PersonSearch />,
    ref: React.createRef(),
  },
  {
    title: 'Lojas',
    component: <StoreSearch />,
    ref: React.createRef(),
  },
  {
    title: 'Personal Stylists',
    component: <PersonalStylistSearch />,
    ref: React.createRef(),
  },
  {
    title: 'Produto',
    component: <ProductSearch />,
    ref: React.createRef(),
  },
];

const handleOnTabChange = (index: number) => {
  switch (index) {
    case 0:
      amplitude.track('Click Explore');
      break;
    case 1:
      amplitude.track('Click Search People');
      break;
    case 2:
      amplitude.track('Click Search Products');
      break;
    default:
      break;
  }
};

export function InitialSearch({ route }) {
  const params = route?.params;
  const activiteTab = params?.initial === 'products' ? 4 : params?.initial === 'people' ? 1 : params?.initial === 'stores' ? 2 : params?.initial === 'professionals' ? 3 : 0;

  return (
    <S.Container>
      <S.Content>
        <Tab
          tabs={tabs as any}
          offset={20}
          activiteTab={activiteTab}
          onTabChange={handleOnTabChange}
          overflowX
        />
      </S.Content>
    </S.Container>
  );
}
