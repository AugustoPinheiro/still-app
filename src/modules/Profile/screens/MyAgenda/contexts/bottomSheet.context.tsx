import React, { ReactNode, createContext, useReducer, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type BottomSheetContextType = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setBottomSheetOptions: React.Dispatch<BottomSheetAction>;
  bottomSheetOptions: BottomSheetOptions;
};

export const BottomSheetAgendaContext = createContext<BottomSheetContextType | null>(null);

type BottomSheetOptions = {
  bottomSheetComponent: ReactNode;
  snapPoints: number[];
  index: number;
};

const initialState: BottomSheetOptions = {
  bottomSheetComponent: <></>,
  snapPoints: [1],
  index: -1,
};

type BottomSheetAction = {
  type: string;
  component: ReactNode;
};

export const BottomSheetAgendaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const bottomSheetReducer = (
    state: BottomSheetOptions,
    action: BottomSheetAction
  ): BottomSheetOptions => {
    bottomSheetRef.current?.collapse();
    switch (action.type) {
      case 'planningMenu':
        return {
          ...state,
          bottomSheetComponent: action.component,
          snapPoints: [105],
        };
      default:
        return initialState;
    }
  };

  const [bottomSheetOptions, setBottomSheetOptions] = useReducer(bottomSheetReducer, initialState);

  return (
    <BottomSheetAgendaContext.Provider
      value={{ bottomSheetRef, bottomSheetOptions, setBottomSheetOptions }}
    >
      {children}
    </BottomSheetAgendaContext.Provider>
  );
};

export function useBottomSheetAgenda() {
  const context = React.useContext(BottomSheetAgendaContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within an BottomSheetProvider');
  }

  return context;
}
