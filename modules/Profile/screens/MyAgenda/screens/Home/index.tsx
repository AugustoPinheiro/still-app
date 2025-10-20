import React from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';

import { BackdropBottomSheet } from '@/components/BottomSheet/BackdropBottomSheet';
import { Tab } from '@/components/Tab';
import { useBottomSheetAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/bottomSheet.context';
import { EventList } from '@/modules/Profile/screens/MyAgenda/screens/EventList';
import { Planning } from '@/modules/Profile/screens/MyAgenda/screens/Planning';

import * as S from './styles';

import * as amplitude from '@amplitude/analytics-react-native';

type Params = {
  origin: {
    goToList?: boolean;
  };
};

const tabs = [
  {
    title: 'Planejamento',
    component: <Planning />,
    ref: React.createRef(),
  },
  {
    title: 'Lista de eventos',
    component: <EventList />,
    ref: React.createRef(),
  },
];

const handleOnTabChange = (index: number) => {
  if (index === 1) {
    amplitude.track('Click Event List');
  }
}

export function MyAgendaHome() {
  const { bottomSheetRef, bottomSheetOptions } = useBottomSheetAgenda();
  const { params } = useRoute<RouteProp<Params, 'origin'>>();
  const goToList = params?.goToList;

  return (
    <>
      <S.Container>
        <Tab tabs={tabs} offset={20} activiteTab={goToList ? 1 : 0} onTabChange={handleOnTabChange} />
      </S.Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetOptions.snapPoints}
        backdropComponent={BackdropBottomSheet}
        index={bottomSheetOptions.index}
        handleComponent={() => null}
      >
        {bottomSheetOptions.bottomSheetComponent}
      </BottomSheet>
    </>
  );
}
