import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { useToast } from '@/contexts/Toast.contexts';

import * as S from './styles';

export const Toast = () => {
  const { toast, hide } = useToast();
  const translateYRef = useRef(new Animated.Value(-100));
  const opacityRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (toast.visible) {
      Animated.parallel([
        Animated.timing(opacityRef.current, {
          duration: 400,
          easing: Easing.ease,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(translateYRef.current, {
          duration: 300,
          easing: Easing.ease,
          toValue: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityRef.current, {
          duration: 200,
          easing: Easing.ease,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(translateYRef.current, {
          duration: 450,
          easing: Easing.ease,
          toValue: -100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [toast]);

  return (
    <S.Toast
      type={toast.type}
      style={{ transform: [{ translateY: translateYRef.current }], opacity: opacityRef.current }}
    >
      <S.Content onPress={hide}>
        <S.ToastMessage> {toast.message}</S.ToastMessage>
      </S.Content>
    </S.Toast>
  );
};
