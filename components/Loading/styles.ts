import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

import LogoIcon from '@/assets/images/logo.svg';

export const Container = styled.View<{ hasBackground?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ hasBackground, theme }) => (hasBackground ? '#00000077' : 'transparent')};
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 10px;
`;

export const AnimatedView = styled(Animated.View)`
  z-index: 99;
`;

export const LoadingIcon = styled(LogoIcon)``;
