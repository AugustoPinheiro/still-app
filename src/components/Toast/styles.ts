import { Animated } from 'react-native';

import styled, { DefaultTheme } from 'styled-components/native';

const getBackgroundColor = (type: string, theme: DefaultTheme) => {
  switch (type) {
    case 'error':
      return theme?.colors?.error;
    case 'success':
      return theme?.colors?.success;
    case 'warning':
      return theme?.colors?.alert;
    default:
      return theme?.colors?.purplish_blue;
  }
};

export const Toast = styled(Animated.View)<{ type?: 'success' | 'error' | 'warning' | 'info' }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: ${({ type = 'info', theme }) => getBackgroundColor(type, theme)};
  border-radius: 100px;
  margin: 0 16px;
  padding: 4px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Content = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  width: 100%;
`;

export const ToastMessage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  margin: 0 10px;
`;
