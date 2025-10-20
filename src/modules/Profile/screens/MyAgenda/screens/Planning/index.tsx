import React, { useCallback, useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import * as amplitude from '@amplitude/analytics-react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { FlashList, ViewToken } from '@shopify/flash-list';
import { format, isFuture, isToday } from 'date-fns';

import PlusRounded from '@/assets/images/plusRounded.svg';
import { Calendar } from '@/components/Calendar/indes';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { EventCard } from '@/modules/Profile/screens/MyAgenda/components/EventCard';
import { LooksCard } from '@/modules/Profile/screens/MyAgenda/components/LooksCard';
import { MenuBottomSheet } from '@/modules/Profile/screens/MyAgenda/components/MenuBottomSheet';
import { useAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/agenda.context';
import { useBottomSheetAgenda } from '@/modules/Profile/screens/MyAgenda/contexts/bottomSheet.context';
import { ScheduleType } from '@/types/ScheduleType';

import * as S from './styles';

const CURRENT_DATE = format(new Date(), 'yyyy-MM-dd');
const DATE_INTERVAL = 5;
const MIDDLE_INDEX = Math.floor(DATE_INTERVAL / 2);
const CARD_HEIGHT = 346;

export function Planning() {
  const navigation = useNavigation();
  const {
    currentDate,
    setCurrentDate,
    getScheduleByDate,
    isLoadingSchedule,
    getDaysWithSchedule,
    getLooksToday,
    schedules,
  } = useAgenda();
  const { setBottomSheetOptions, bottomSheetRef } = useBottomSheetAgenda();
  const [isModalCalendarOpen, setIsModalCalendarOpen] = React.useState(false);

  const { width } = Dimensions.get('window');
  const widthSizeItem = React.useMemo(() => width - 30, [width]);
  const [cardsHeight, setCardsHeight] = React.useState<number>(500);
  const cardWidth = width - 24;
  const flashListRef = React.useRef<FlashList<any>>(null);
  const scrollRef = React.useRef<ScrollView>(null);

  // Estado para o índice ativo do carrossel de dias
  const [activeDayIndex, setActiveDayIndex] = React.useState(MIDDLE_INDEX);

  function dateSubstractDays(date: Date, day: number) {
    const newDate = new Date(date);
    const dateAt = new Date(newDate.setDate(newDate.getDate() - day));

    return format(dateAt, 'yyyy-MM-dd');
  }

  function generateHorizontalCalendarDates(date: string, days: number) {
    const today = new Date(date ? date + 'T12:00:00' : '');
    const dateForward = new Date(today.setDate(today.getDate() + DATE_INTERVAL / 2));
    const dates = [];

    for (let i = 0; i < days; i++) {
      dates.push(dateSubstractDays(dateForward, i));
    }

    return dates.reverse();
  }

  const [daysArray, setDaysArray] = React.useState<string[]>(() =>
    generateHorizontalCalendarDates(CURRENT_DATE, DATE_INTERVAL)
  );

  function getTextCard(dateItem: string) {
    const dateCard = new Date(dateItem + 'T12:00:00');

    if (isToday(dateCard)) {
      return 'O que você está\nvestindo hoje?';
    }

    if (isFuture(dateCard)) {
      return `O que você irá vestir\nneste dia?`;
    }

    return `O que você vestiu\nneste dia?`;
  }

  function handleAddLook() {
    amplitude.track('Click Add Look To Day');

    bottomSheetRef.current?.close();
    navigation.navigate('MyLooks');
  }

  function handleGoToEventDetails(item: ScheduleType) {
    // @ts-expect-error
    navigation.navigate('DetailsSchedule', { item });
  }

  function handleGoToCreateEvent() {
    amplitude.track('Click Event Create');
    // @ts-expect-error
    navigation.navigate('CreateEvent');
  }

  function handleDateSelection(date: string) {
    setCurrentDate(date);
  }

  function handleDayPress(date: string) {
    setCurrentDate(date);
    setIsModalCalendarOpen(false);
  }

  function handleMonthChange(date: string) {
    setCurrentDate(date);
  }

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      if (isLoadingSchedule || item !== currentDate) {
        return (
          <S.ScheduleContainer>
            <S.Content width={cardWidth} style={{ height: CARD_HEIGHT }}>
              <Loading hasBackground={false} style={{ flex: 1 }} />
            </S.Content>
          </S.ScheduleContainer>
        );
      }

      const todaySchedules = getScheduleByDate(item)?.filter(
        (schedule) => schedule.title !== 'LOOK_DAY'
      );

      const looksToday = getLooksToday(item);
      const hasLooks = Boolean(looksToday.looks?.length || looksToday.clothings?.length);
      const hasEvent = !!todaySchedules?.length;

      if (!todaySchedules?.length && !hasLooks) {
        return (
          <S.Content width={cardWidth} style={{ height: CARD_HEIGHT }}>
            <S.Center>
              <S.ContentIconContainer
                onPress={() => {
                  amplitude.track('Click Wearing Today');
                  setBottomSheetOptions({
                    type: 'planningMenu',
                    component: (
                      <MenuBottomSheet
                        onPressAddLook={handleAddLook}
                        onPressCreateEvent={handleGoToCreateEvent}
                      />
                    ),
                  });
                }}
              >
                <PlusRounded />
              </S.ContentIconContainer>
              <S.PlannerText>{getTextCard(item)}</S.PlannerText>
            </S.Center>
          </S.Content>
        );
      }

      // Caso específico: apenas eventos (sem roupas)
      if (hasEvent && !hasLooks) {
        return (
          <S.ScheduleContainer
            onLayout={({ nativeEvent: { layout } }) => {
              setCardsHeight(layout.height + 50);
            }}
          >
            <View style={{ alignItems: 'center' }}>
              {todaySchedules.map((schedule) => (
                <EventCard
                  key={schedule.id}
                  schedule={schedule}
                  onPress={() => handleGoToEventDetails(schedule)}
                />
              ))}
            </View>
          </S.ScheduleContainer>
        );
      }

      return (
        <S.ScheduleContainer
          onLayout={({ nativeEvent: { layout } }) => {
            setCardsHeight(layout.height + 50);
          }}
        >
          {hasLooks && (
            <LooksCard
              looks={looksToday.looks}
              clothings={looksToday.clothings}
            />
          )}
          {hasEvent && (
            <View style={{ marginTop: hasLooks ? 16 : 0, alignItems: 'center' }}>
              {todaySchedules.map((schedule) => (
                <EventCard
                  key={schedule.id}
                  schedule={schedule}
                  onPress={() => handleGoToEventDetails(schedule)}
                />
              ))}
            </View>
          )}
        </S.ScheduleContainer>
      );
    },
    [currentDate, isLoadingSchedule, schedules]
  );

  const handleScroll = useCallback(
    ({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (!viewableItems[0]) return;

      const { key, index, isViewable } = changed[0];

      if (index === null || !isViewable || index === 2) return;

      setCurrentDate(key);
      setActiveDayIndex(index);
    },
    [daysArray]
  );

  useEffect(() => {
    setDaysArray(generateHorizontalCalendarDates(currentDate, DATE_INTERVAL));

    flashListRef.current?.scrollToOffset({ offset: widthSizeItem * 2, animated: false });
  }, [currentDate]);

  useEffect(() => {
    flashListRef.current?.rlvRef?._onSizeChanged({
      width: flashListRef.current?.rlvRef._layout.width,
      height: cardsHeight,
    });
  }, [flashListRef, cardsHeight]);

  return (
    <>
      <S.Container ref={scrollRef}>
        <S.Header>
          <S.HeaderTextContainer>
            <S.HeaderDate>
              {format(new Date(currentDate + 'T12:00:00'), "dd 'DE' MMMM, yyyy")}
            </S.HeaderDate>
            <S.HeaderWeekDay>{format(new Date(currentDate + 'T12:00:00'), 'EEEE')}</S.HeaderWeekDay>
          </S.HeaderTextContainer>
          <S.HeaderButton onPress={() => setIsModalCalendarOpen(true)}>
            <S.HeaderIconLeft />
          </S.HeaderButton>
        </S.Header>

        <FlashList
          ref={flashListRef}
          data={daysArray}
          extraData={[currentDate, schedules]}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={widthSizeItem}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={cardWidth}
          onViewableItemsChanged={handleScroll}
          onScrollEndDrag={() => {
            scrollRef.current?.scrollTo({ y: 0, animated: true });
          }}
          initialScrollIndex={MIDDLE_INDEX}
          keyExtractor={(item) => `${item}`}
          viewabilityConfig={{
            waitForInteraction: true,
            itemVisiblePercentThreshold: 100,
          }}
        />

        {/* Indicadores de página para os dias */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 8 }}>
          {daysArray.map((_, idx) => (
            <View
              key={idx}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: idx === activeDayIndex ? '#222' : '#ccc',
              }}
            />
          ))}
        </View>
      </S.Container>
      {isModalCalendarOpen && (
        <Modal full>
          <S.ModalContainer>
            <S.ModalCloseContainer>
              <S.ModalCloseButton onPress={() => setIsModalCalendarOpen(false)}>
                <MaterialCommunityIcons name="close" color="#8A8A99" size={24} />
              </S.ModalCloseButton>
            </S.ModalCloseContainer>
            <Calendar
              selectedDate={currentDate}
              setSelectedDate={handleDateSelection}
              onDayPress={handleDayPress}
              onMonthChange={handleMonthChange}
              daysWithAppointments={getDaysWithSchedule()}
            />
          </S.ModalContainer>
        </Modal>
      )}
    </>
  );
}
