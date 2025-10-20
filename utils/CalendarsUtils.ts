export const newDateWithTimezone = (date: string): Date => {
  const hourAndMilliseconds = 1000 * 60 * 60;
  const newDate = new Date(date);

  const dateWithTimezone = new Date(newDate.getTime() + 12 * hourAndMilliseconds);

  return dateWithTimezone;
};
