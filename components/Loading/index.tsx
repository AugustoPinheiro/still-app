import React from 'react';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import * as S from './styles';

type LoadingProps = {
  hasBackground?: boolean;
};

export function Loading({ hasBackground = true }: LoadingProps) {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.1, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  return (
    <S.Container hasBackground={hasBackground}>
      <S.AnimatedView style={{ opacity, padding: 20 }}>
        <S.LoadingIcon />
      </S.AnimatedView>
    </S.Container>
  );
}
