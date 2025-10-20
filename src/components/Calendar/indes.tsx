import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Calendar as CalendarBase } from 'react-native-calendars';

import IconFeather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';

import { newDateWithTimezone } from '@/utils/CalendarsUtils';

import './localeConfig';

interface ICalendarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onDayPress?: (date: string) => void;
  onMonthChange?: (date: string) => void;
  daysWithAppointments?: number[];
}

export function Calendar({ 
  selectedDate, 
  setSelectedDate, 
  onDayPress,
  onMonthChange,
  daysWithAppointments 
}: ICalendarProps) {
  const TODAY_FORMATTED = format(new Date(), 'yyyy-MM-dd');

  const theme = useTheme();
  const [keySelected, setKeySelected] = useState(TODAY_FORMATTED);

  const handleCurrentDayPress = useCallback(() => {
    setKeySelected(new Date().toISOString());
    const todayDate = TODAY_FORMATTED;
    setSelectedDate(todayDate);
    onDayPress?.(todayDate);
  }, [TODAY_FORMATTED, setSelectedDate, onDayPress]);

  const handleDaysWithAppointments = useCallback(() => {
    if (daysWithAppointments) {
      const daysWithAppointmentsFormatted: Record<
        string,
        { marked: boolean; dotColor: string; selected?: boolean }
      > = {};

      for (const day of daysWithAppointments) {
        const date = format(newDateWithTimezone(selectedDate).setDate(day), 'yyyy-MM-dd');

        daysWithAppointmentsFormatted[date] = {
          marked: true,
          dotColor: theme?.colors.red03,

          selected: date === selectedDate,
        };
      }

      return daysWithAppointmentsFormatted;
    }
  }, [daysWithAppointments, selectedDate, theme?.colors.primary_black]);

  const handleDayPress = useCallback((day: any) => {
    setSelectedDate(day.dateString);
    onDayPress?.(day.dateString);
  }, [setSelectedDate, onDayPress]);

  const handleMonthChange = useCallback((month: any) => {
    setSelectedDate(month.dateString);
    onMonthChange?.(month.dateString);
  }, [setSelectedDate, onMonthChange]);

  return (
    <View style={{ position: 'relative' }}>
      <CalendarBase
        key={keySelected}
        monthFormat="MMMM 'de' yyyy"
        initialDate={selectedDate}
        markedDates={{ [selectedDate]: { selected: true }, ...handleDaysWithAppointments() }}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <Icon name="chevron-left" size={24} color={theme?.colors.primary_black} />
          ) : (
            <Icon name="chevron-right" size={24} color={theme?.colors.primary_black} />
          )
        }
        theme={{
          arrowColor: theme?.colors.primary_black,

          monthTextColor: theme?.colors.primary_black,
          textMonthFontFamily: theme?.fonts.MEDIUM,
          textMonthFontWeight: '500',
          textMonthFontSize: theme?.fontSizes.SM,

          dayTextColor: theme?.colors.gray03,
          textDayFontFamily: theme?.fonts.MEDIUM,
          textDayFontSize: theme?.fontSizes.SM,
          textDayStyle: {
            lineHeight: 21,
          },
          textSectionTitleColor: theme?.colors.gray02,
          textDayHeaderFontFamily: theme?.fonts.MEDIUM,
          textDayHeaderFontSize: theme?.fontSizes.SM,

          selectedDayTextColor: theme?.colors.white,
          selectedDayBackgroundColor: theme?.colors.primary_black,

          todayTextColor: theme?.colors.red02,
          textDisabledColor: theme?.colors.gray06,

          // @ts-expect-error
          'stylesheet.calendar.main': {
            container: {
              minWidth: '100%',
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: theme?.colors.white,
              borderRadius: 8,
            },
            monthView: {
              paddingHorizontal: 14,
            },
          },

          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingBottom: 12,
              marginTop: 12,
              marginBottom: 12,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: theme?.colors.gray06,
            },

            arrow: {
              padding: 2,
            },
          },

          'stylesheet.day.basic': {
            base: {
              width: 28,
              height: 28,
              alignItems: 'center',
              justifyContent: 'center',
            },
            selected: {
              backgroundColor: theme?.colors.primary_black,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        }}
      />
      <TouchableOpacity
        style={{
          zIndex: 10,
          position: 'absolute',
          top: 16,
          right: 28,
        }}
        onPress={handleCurrentDayPress}
      >
        <IconFeather name="calendar" size={20} color={theme?.colors.primary_black} />
      </TouchableOpacity>
    </View>
  );
}
