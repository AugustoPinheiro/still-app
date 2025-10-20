import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import * as S from './styles';

type SidebarFloatProps = {
  right: number;
  bottom: number;
  show?: boolean;
  children: React.ReactNode;
};

export function SidebarFloat({ right, bottom, show = false, children }: SidebarFloatProps) {
  const rightPosition = useRef(new Animated.Value(-10)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [showElement, setShowElement] = React.useState(false);

  useEffect(() => {
    if (show) setShowElement(true);

    Animated.parallel([
      Animated.timing(rightPosition, {
        toValue: show ? right : -40,
        duration: 150,
        useNativeDriver: false,
      }),

      Animated.timing(opacity, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    if (!show) {
      setTimeout(() => {
        setShowElement(false);
      }, 200);
    }
  }, [show]);

  if (!showElement) return null;

  return (
    <S.SidebarFloatContainer
      style={{
        right: rightPosition,
        bottom,
        opacity,
      }}
    >
      {children}
    </S.SidebarFloatContainer>
  );
}
