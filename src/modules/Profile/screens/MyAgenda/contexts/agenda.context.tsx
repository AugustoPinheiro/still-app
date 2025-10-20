import React, { createContext, useContext } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { eachDayOfInterval, format, isWithinInterval } from 'date-fns';

import { useToast } from '@/contexts/Toast.contexts';
import { getSchedules, putSchedule } from '@/modules/Profile/services/agenda.services';
import { EventClothingType } from '@/types/EventClothingType';
import { EventLookType } from '@/types/EventLookType';
import { ScheduleType } from '@/types/ScheduleType';
import { dateWithTimezone } from '@/utils/dateWithTimezone';

type AgendaContextType = {
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
  schedules: ScheduleType[] | undefined;
  isLoadingSchedule: boolean;
  isFetchingSchedule: boolean;
  getScheduleByDate: (date: string) => ScheduleAgendaType[] | undefined;
  getDaysWithSchedule: () => number[];
  getLooksToday: (date: string) => {
    looks: EventLookType[];
    clothings: EventClothingType[];
  };
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ScheduleType[], Error>>;
  toggleActiveSchedule: (scheduleId: number) => Promise<void>;
  CURRENT_MONTH: string;
  CURRENT_YEAR: string;
};

export type ScheduleAgendaType = ScheduleType & {
  hour?: string;
  isAllDay?: boolean;
  isOneDay?: boolean;
};

const AgendaContext = createContext<AgendaContextType>({} as AgendaContextType);

export const useAgenda = () => useContext(AgendaContext);

type Props = {
  children: React.ReactNode;
};

const CURRENT_DATE = format(new Date(), 'yyyy-MM-dd');

export const AgendaProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = React.useState(CURRENT_DATE);
  const CURRENT_MONTH = format(new Date(currentDate + 'T12:00:00'), 'MM');
  const CURRENT_YEAR = format(new Date(currentDate + 'T12:00:00'), 'yyyy');
  const { show } = useToast();

  function sanitizeDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  async function fetchSchedules() {
    try {
      const response = await getSchedules(CURRENT_YEAR, CURRENT_MONTH);

      return response;
    } catch (error) {
      show({
        type: 'error',
        message: 'Não foi possível carregar sua agenda',
      });
      return [];
    }
  }

  const {
    data: schedules,
    isLoading: isLoadingSchedule,
    isFetching: isFetchingSchedule,
    refetch,
  } = useQuery({
    queryKey: ['schedules', CURRENT_MONTH, CURRENT_YEAR],
    queryFn: fetchSchedules,
  });

  function updateSchedule(schedule: ScheduleType) {
    if (!schedules) return;

    const scheduleIndex = schedules?.findIndex((item) => item.id === schedule.id);

    if (scheduleIndex === -1) {
      return;
    }

    schedules[scheduleIndex] = schedule;

    queryClient.setQueryData(['schedules', CURRENT_MONTH, CURRENT_YEAR], schedules);
  }

  async function toggleActiveSchedule(scheduleId: number) {
    if (!schedules) return;

    try {
      const scheduleIndex = schedules?.findIndex((item) => item.id === scheduleId);

      if (scheduleIndex === -1) {
        return;
      }

      const schedule = schedules[scheduleIndex];

      if (!schedule) {
        return;
      }

      const newSchedule = { ...schedule, active: !schedule.active };

      await putSchedule(newSchedule, scheduleId);
      updateSchedule(newSchedule);
    } catch (error: any) {
      const message = error?.message || 'Não foi possível atualizar o status do evento.';

      show({
        message,
        type: 'error',
      });
    }
  }

  function getScheduleByDate(date: string) {
    if (!schedules) {
      return [];
    }
    try {
      const schedulesToday = [];

      for (const schedule of schedules) {
        const startDate = dateWithTimezone(new Date(schedule.start_date));
        const endDate = dateWithTimezone(new Date(schedule.end_date));
        const isStartMoreThanEnd = startDate > endDate;

        const hasToday = isWithinInterval(new Date(date), {
          start: new Date(sanitizeDate(isStartMoreThanEnd ? endDate : startDate)),
          end: new Date(sanitizeDate(isStartMoreThanEnd ? startDate : endDate)),
        });

        if (!hasToday) {
          continue;
        }

        const isOneDay = sanitizeDate(startDate) === sanitizeDate(endDate);
        const isAllDay = isOneDay && startDate === endDate;

        schedulesToday.push({
          ...schedule,
          start_date: sanitizeDate(startDate),
          end_date: sanitizeDate(endDate),
          hour: format(startDate, 'HH'),
          isAllDay,
          isOneDay,
        });
      }

      return schedulesToday;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function getLooksToday(data: string) {
    if (!schedules) {
      return {
        looks: [],
        clothings: [],
      };
    }

    const looksToday: EventLookType[] = [];
    const clothingsToday: EventClothingType[] = [];

    for (const schedule of schedules) {
      // Para eventos de LOOK_DAY, verificar se a data é exatamente igual
      if (schedule.title === 'LOOK_DAY') {
        const startDate = sanitizeDate(new Date(schedule.start_date));
        if (startDate === data) {
          if (schedule.looks?.length) {
            looksToday.push(...schedule.looks);
          }
          if (schedule.clothings?.length) {
            clothingsToday.push(...schedule.clothings);
          }
        }
        continue;
      }
      
      // Para outros eventos, verificar se a data está dentro do intervalo
      const startDate = dateWithTimezone(new Date(schedule.start_date));
      const endDate = dateWithTimezone(new Date(schedule.end_date));
      const isStartMoreThanEnd = startDate > endDate;

      const hasToday = isWithinInterval(new Date(data), {
        start: new Date(sanitizeDate(isStartMoreThanEnd ? endDate : startDate)),
        end: new Date(sanitizeDate(isStartMoreThanEnd ? startDate : endDate)),
      });

      if (hasToday) {
        if (schedule.looks?.length) {
          looksToday.push(...schedule.looks);
        }
        if (schedule.clothings?.length) {
          clothingsToday.push(...schedule.clothings);
        }
      }
    }

    return {
      looks: looksToday,
      clothings: clothingsToday,
    };
  }

  function getDaysWithSchedule() {
    const days = schedules?.map((schedule) => {
      try {
        const daysInterval = eachDayOfInterval({
          start: new Date(schedule.start_date),
          end: new Date(schedule.end_date),
        });

        return daysInterval.map((day) => day.getDate());
      } catch (error) {
        console.error(error);
        return [];
      }
    });

    if (!days) {
      return [];
    }

    return Array.from(new Set(days.flat()));
  }

  const valueMemo = React.useMemo(
    () => ({
      currentDate,
      setCurrentDate,
      schedules,
      isLoadingSchedule,
      isFetchingSchedule,
      getScheduleByDate,
      getDaysWithSchedule,
      getLooksToday,
      refetch,
      toggleActiveSchedule,
      CURRENT_MONTH,
      CURRENT_YEAR,
    }),
    [currentDate, schedules, isLoadingSchedule, isFetchingSchedule]
  );

  return <AgendaContext.Provider value={valueMemo}>{children}</AgendaContext.Provider>;
};
