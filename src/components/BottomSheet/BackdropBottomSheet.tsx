import React from 'react';
import { StyleSheet } from 'react-native';

import { BottomSheetBackdrop, type BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

type Props = BottomSheetBackdropProps & {
  onPressBackDrop?: () => void;
  backgroundColor?: string;
};

export function BackdropBottomSheet({
  onPressBackDrop,
  backgroundColor = 'rgba(0, 0, 0, 1)',
  ...props
}: Props) {
  const { close } = useBottomSheet();

  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5}
      onPress={onPressBackDrop ?? close}
      enableTouchThrough={false}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={[{ backgroundColor }, StyleSheet.absoluteFillObject]}
    />
  );
}
