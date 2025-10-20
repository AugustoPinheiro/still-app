import { Animated } from 'react-native';

import { styled } from 'styled-components/native';

export const SidebarFloatContainer = styled(Animated.View)`
  position: absolute;
  z-index: 1;

  gap: 24px;
  padding: 16px 4px;
 
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 20;
`;
