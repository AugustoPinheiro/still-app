import React from 'react';

import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import TickCircleIcon from '@/assets/images/tick-circle.svg';
import { Button } from '@/components/Button';
import { ScheduleType } from '@/types/ScheduleType';
import { TripType } from '@/types/TripType';

import * as S from './styles';

type Params = {
  origin: {
    event?: ScheduleType | TripType;
  };
};

export function SuccessEvent() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<Params, 'origin'>>();
  const event = params?.event;

  function goToList() {
    const routes = {
      index: 0,
      routes: [{ name: 'Home', params: { goToList: true } }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  function goToAddParts() {
    const routes = {
      index: 1,
      routes: [
        { name: 'Home', params: { goToList: true } },
        { name: 'MyLooks', params: { eventId: event?.id } },
      ],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  return (
    <S.Container>
      <TickCircleIcon />
      <S.Text>Evento criado!</S.Text>
      <S.ButtonContainer>
        <Button onPress={goToAddParts} title="Adicionar Peças/Looks" marginBottom={0} />
        <Button onPress={goToList} type="secondary" title="Adicionar depois" />
      </S.ButtonContainer>
    </S.Container>
  );
}
