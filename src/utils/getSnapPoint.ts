import { Platform } from 'react-native';

export function getSnapPoint(number: number) {
  return Platform.OS === 'ios' ? number : number + 9;
}
