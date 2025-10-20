import React, { type Ref, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Keyboard } from 'react-native';

import BottomSheetComponent, { type BottomSheetProps } from '@gorhom/bottom-sheet';

import { BackdropBottomSheet } from '@/components/BottomSheet/BackdropBottomSheet';

type TBottomSheetProps = Omit<BottomSheetProps, 'snapPoints'> & {
  children: React.ReactNode;
  snapPoints?: Array<number | string>;
};

type BottomSheetRef = BottomSheetComponent;

const BottomSheet = forwardRef((props: TBottomSheetProps, ref: Ref<BottomSheetRef>) => {
  const { children, snapPoints = ['40%'], ...rest } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [index, setIndex] = React.useState(-1);
  const [snapPointsState, setSnapPointsState] = React.useState<Array<number | string>>(
    snapPoints?.length ? snapPoints : ['40%']
  );
  const bottomSheetRef = React.useRef<BottomSheetComponent>(null);

  // @ts-expect-error
  useImperativeHandle(ref, () => ({
    expand: () => {
      setIndex(0);
      setIsOpen(true);
      bottomSheetRef.current?.expand();
    },
    close: () => {
      setIndex(-1);
      setIsOpen(false);
      bottomSheetRef.current?.close();
    },
  }));

  useEffect(() => {
    setSnapPointsState(snapPoints);
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (!isOpen) return;
      setSnapPointsState(['95%']);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (!isOpen) return;

      setSnapPointsState(snapPoints);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
      setSnapPointsState(['40%']);
    };
  }, [Keyboard, snapPoints, isOpen]);

  return (
    <BottomSheetComponent
      index={index}
      ref={bottomSheetRef}
      key="BottomSheetGlobal"
      snapPoints={snapPointsState}
      enablePanDownToClose
      backdropComponent={BackdropBottomSheet}
      {...rest}
    >
      {children}
    </BottomSheetComponent>
  );
});

export { BottomSheet, type BottomSheetRef };
