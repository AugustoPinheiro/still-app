import { ifBiggerThanReturn } from '@/utils/ifBiggerThanReturn';
import { ifLessThanReturn } from '@/utils/ifLessThanReturn';

type Props = {
  value: number;
  mim: number;
  max: number;
  returnMin: number;
  returnMax: number;
};

export function isOutOfRangeReturn({ value, mim, max, returnMin, returnMax }: Props): number {
  let returnValue = value;

  returnValue = ifLessThanReturn<number>(returnValue, mim, returnMin);
  returnValue = ifBiggerThanReturn<number>(returnValue, max, returnMax);

  return returnValue;
}
