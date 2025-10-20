export function ifLessThanReturn<T>(value: number, limit: number, returnValue: T): T | number {
  if (value < limit) {
    return returnValue;
  }

  return value;
}
