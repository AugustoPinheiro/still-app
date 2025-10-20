import React, {
  type ReactElement,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { Keyboard } from 'react-native';

import { BottomSheetRef } from '@/components/BottomSheet';

interface BottomSheetProps {
  id: string;
  content: ReactElement;
  snapPoints?: Array<number | string>;
}

interface BottomSheetContextData {
  bottomSheetRef: React.RefObject<BottomSheetRef>;
  bottomSheetProps: BottomSheetProps;
  expand: () => void;
  close: () => void;
  setBottomSheetProps: React.Dispatch<React.SetStateAction<BottomSheetProps>>;
}

const BottomSheetContext = createContext<BottomSheetContextData>({} as BottomSheetContextData);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [bottomSheetProps, setBottomSheetProps] = React.useState<BottomSheetProps>({
    id: '',
    content: <></>,
    snapPoints: [1],
  });

  const expand = useCallback(() => {
    if (!bottomSheetRef?.current) return;

    bottomSheetRef.current?.expand();
  }, [bottomSheetRef.current]);

  function close() {
    Keyboard.isVisible() && Keyboard.dismiss();

    bottomSheetRef.current?.close();
  }

  return (
    <BottomSheetContext.Provider
      value={{ bottomSheetRef, bottomSheetProps, expand, close, setBottomSheetProps }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}
