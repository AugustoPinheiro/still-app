export const dateWithTimezone = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const withTimezone = new Date(date.valueOf() + tzoffset);

  return withTimezone;
};
