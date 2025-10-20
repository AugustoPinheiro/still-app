import { Platform } from 'react-native';

export function convertLocalTimeToUTCTime(dateString: string): string {
  const date = new Date(dateString);

  if (Platform.OS === 'ios') {
    return date.toISOString();
  }

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  ).toISOString();
}
