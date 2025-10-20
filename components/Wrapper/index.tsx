import React from 'react';
import { View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import { BottomSheet } from '@/components/BottomSheet';
import { ErrorBoundaryFallback } from '@/components/ErrorBoundaryFallback';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const {
    bottomSheetRef,
    bottomSheetProps: { content, snapPoints },
  } = useBottomSheet();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <View style={{ flex: 1 }}>{children}</View>
      <BottomSheet key="BottomSheet" ref={bottomSheetRef} snapPoints={snapPoints}>
        {content}
      </BottomSheet>
    </ErrorBoundary>
  );
}
