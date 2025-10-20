import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Image } from 'expo-image';

import AgendaEmptyImage from '@/assets/images/agendaEmptyImage.svg';
import { ScheduleAgendaType } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  schedule: ScheduleAgendaType;
};

export function EventCard({ schedule, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      {!schedule.all_day && schedule.isOneDay && <S.HourText>{schedule.hour}h</S.HourText>}
      {schedule.all_day && <S.HourText>{''}</S.HourText>}
      <S.Card>
        {schedule.image ? (
          <S.ImageContainer>
            <Image source={{ uri: schedule.image }} cachePolicy="disk" />
          </S.ImageContainer>
        ) : (
          <S.EmptyContainer>
            <AgendaEmptyImage />
          </S.EmptyContainer>
        )}
        <S.InfoContainer>
          <S.Title>{schedule.title}</S.Title>
          <S.LocationText>Local: {schedule.location}</S.LocationText>
        </S.InfoContainer>
      </S.Card>
    </S.Container>
  );
}
