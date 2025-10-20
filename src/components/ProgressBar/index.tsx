import React from 'react';
import { Animated, Easing } from 'react-native';

import * as S from './styles';

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = progressAnim.interpolate({ inputRange, outputRange });

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <S.ProgressBarContainer>
      <S.ProgressBar style={{ width: animatedWidth }} />
    </S.ProgressBarContainer>
  );
}
