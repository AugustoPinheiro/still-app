import { ptBR } from 'date-fns/locale';

export const formatDistanceOptions = {
  locale: {
    ...ptBR,
    formatDistance: (unit: string, count: number) => {
      switch (true) {
        case unit === 'xDays':
          return `${count}d`;

        case unit === 'xHours':
          return `${count}h`;

        case unit === 'xMinutes':
          return `${count}min`;

        case unit === 'xMonths':
          return `${count}M`;

        case unit === 'xSeconds':
          return `${count}s`;

        case unit === 'xYears':
          return `${count}y`;
      }

      return '%d hours';
    },
  },
};
