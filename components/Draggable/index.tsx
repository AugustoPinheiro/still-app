import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import * as S from './styles';

type DraggableProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  containerWidth: number;
  containerHeight: number;
  returnStyleToChildren?: boolean;
  onTouchStart?: () => void;
  isSelected?: boolean;
  startX?: number;
  startY?: number;
};

export function Draggable({
  children,
  width = 150,
  height = 150,
  containerHeight,
  containerWidth,
  onTouchStart,
  isSelected,
  startX,
  startY,
}: DraggableProps) {
  const scale = useSharedValue<number>(1);
  const savedScale = useSharedValue<number>(1);
  const contentViewX = useSharedValue<number>(startX ?? 80);
  const contentViewY = useSharedValue<number>(startY ?? 80);
  const contentRotation = useSharedValue<number>(0);
  const savedRotation = useSharedValue<number>(0);

  const childrenRef = React.useRef<Animated.View>(null);

  const rotateGestureHandler = React.useMemo(
    () =>
      Gesture.Rotation()
        .onUpdate((event) => {
          const { rotation } = event;

          contentRotation.value = savedRotation.value + rotation;
        })
        .onEnd(() => {
          savedRotation.value = contentRotation.value;
        }),
    [contentRotation, savedRotation]
  );

  const pinchGestureHandler = React.useMemo(
    () =>
      Gesture.Pinch()
        .onUpdate((event) => {
          scale.value = savedScale.value * event.scale;
        })
        .onEnd(() => {
          savedScale.value = scale.value;
        }),
    [scale, savedScale]
  );

  const panGestureHandler = React.useMemo(
    () =>
      Gesture.Pan().onChange((event) => {
        if (event.numberOfPointers > 1) return;

        contentViewX.value += event.changeX;
        contentViewY.value += event.changeY;
      }),
    [contentViewX, contentViewY]
  );

  const gestureComposed = React.useMemo(
    () => Gesture.Simultaneous(pinchGestureHandler, panGestureHandler, rotateGestureHandler),
    [pinchGestureHandler, panGestureHandler, rotateGestureHandler]
  );

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = contentViewX.value;
    const translateY = contentViewY.value;

    const transform: any = [];

    if (scale.value >= 0.6) {
      transform.push({ scale: scale.value });
    } else {
      transform.push({ scale: 0.6 });
    }

    transform.push({ translateX });
    transform.push({ translateY });

    return {
      transform,
    };
  }, [scale, contentViewX, contentViewY]);

  const animateStyleToChildren = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${(contentRotation.value / Math.PI) * 180}deg` }],
    };
  }, [contentRotation]);

  return (
    <S.Container style={{ height: 0, width: 0 }}>
      <GestureDetector gesture={gestureComposed}>
        <Animated.View
          ref={childrenRef}
          onTouchStart={onTouchStart}
          style={[
            { zIndex: 11, width, height },
            animatedStyle,
            isSelected ? { borderWidth: 1, borderColor: '#c7c7d2', borderStyle: 'dashed' } : {},
          ]}
        >
          <Animated.View style={[{ flex: 1 }, animateStyleToChildren]}>{children}</Animated.View>
        </Animated.View>
      </GestureDetector>
    </S.Container>
  );
}
