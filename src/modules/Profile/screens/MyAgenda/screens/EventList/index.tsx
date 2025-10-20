import React from 'react';
import MonthPicker, { EventTypes } from 'react-native-month-year-picker';

import * as amplitude from '@amplitude/analytics-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import AgendaEmptyImage from '@/assets/images/agendaEmptyImage.svg';
import { Loading } from '@/components/Loading';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { ScheduleType } from '@/types/ScheduleType';
import { dateWithTimezone } from '@/utils/dateWithTimezone';

import * as S from './styles';

export function EventList() {
  const [showModal, setShowModal] = React.useState(false);
  const { schedules, currentDate, setCurrentDate, isLoadingSchedule } = useAgenda();
  const navigation = useNavigation();

  const currentDateFormatted = React.useMemo(() => {
    const date = new Date(currentDate + 'T12:00:00');

    return format(date, 'MMMM, yyyy');
  }, [currentDate]);

  const toggleShowPicker = React.useCallback(() => setShowModal((prevState) => !prevState), []);

  const onValueChange = React.useCallback(
    (event: EventTypes, newDate: Date) => {
      if (event === 'neutralAction') {
        toggleShowPicker();
        return setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
      }

      const selectedDate = newDate || new Date(currentDate + 'T12:00:00');

      toggleShowPicker();
      setCurrentDate(format(selectedDate, 'yyyy-MM-dd'));
    },
    [currentDate, toggleShowPicker]
  );

  function handleGoToCreateEvent() {
    amplitude.track('Click Event Create');
    // @ts-expect-error
    navigation.navigate('CreateEvent');
  }

  function handleGoToEventDetails(item: ScheduleType) {
    // @ts-expect-error
    navigation.navigate('DetailsSchedule', { item });
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.HeaderDateButton onPress={toggleShowPicker}>
            <S.HeaderDate>{currentDateFormatted}</S.HeaderDate>
            <MaterialCommunityIcons
              name={showModal ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#000"
            />
          </S.HeaderDateButton>

          <S.HeaderDateButton onPress={handleGoToCreateEvent}>
            <S.HeaderDateSecondary>Criar evento</S.HeaderDateSecondary>
            <MaterialCommunityIcons name="plus" size={20} color="#000" />
          </S.HeaderDateButton>
        </S.Header>

        <S.CardContainer>
          {isLoadingSchedule ? (
            <Loading hasBackground={false} />
          ) : !schedules?.length ? (
            <S.EmptyContainer>
              <S.EmptyTitle>Nenhum evento criado.</S.EmptyTitle>
              <S.EmptyText>Não existem eventos para esse mês. Crie um agora mesmo!</S.EmptyText>
            </S.EmptyContainer>
          ) : (
            schedules
              ?.reverse()
              ?.filter((schedule) => schedule?.title !== 'LOOK_DAY')
              ?.map((schedule) => (
                <S.Card key={schedule?.id} onPress={() => handleGoToEventDetails(schedule)}>
                  <S.CardTitle>{schedule?.title}</S.CardTitle>
                  <S.ScrollViewCardImages horizontal showsHorizontalScrollIndicator={false}>
                    <S.CardImages>
                      {schedule?.looks?.length || schedule?.clothings?.length ? (
                        <>
                          {schedule?.looks?.map((look) => (
                            <S.CardImage
                              key={look?.id}
                              source={{ uri: look?.look?.image }}
                              contentFit="cover"
                              cachePolicy="disk"
                            />
                          ))}
                          {schedule?.clothings?.map((clothing) => (
                            <S.CardImage
                              key={clothing?.id}
                              source={{ uri: clothing?.clothing?.image }}
                              contentFit="cover"
                              cachePolicy="disk"
                            />
                          ))}
                        </>
                      ) : (
                        <S.CardImageEmpty>
                          <AgendaEmptyImage />
                        </S.CardImageEmpty>
                      )}
                    </S.CardImages>
                  </S.ScrollViewCardImages>
                  <S.CardFooter>
                    <S.CardDescription>
                      {format(
                        dateWithTimezone(new Date(schedule?.start_date)),
                        "dd 'de' MMMM '-' HH'h'"
                      )}
                    </S.CardDescription>
                  </S.CardFooter>
                </S.Card>
              ))
          )}
        </S.CardContainer>
      </S.Container>
      {showModal && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date(currentDate + 'T12:00:00')}
          locale="pt-br"
          okButton="Selecionar"
          cancelButton="Cancelar"
          neutralButton="Atual"
          mode="full"
        />
      )}
    </>
  );
}
