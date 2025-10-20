import { Animated } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const TabContent = styled.View<{ ref: any }>`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray06};
`;

export const TabContainer = styled.View``;

export const TabContentTitle = styled.TouchableOpacity<{ length: number; ref: any, active?: boolean }>`
  padding-bottom: 4px;
  flex-direction: row;
  flex-basis: ${({ length }) => 100 / length}%;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${({ active }) => (active ? '2px' : '0')};
  order-bottom-color: ${({ theme }) => theme.colors.primary_black};
`;

export const TabTitle = styled.Text<{ active?: boolean }>`
  font-family: ${({ theme, active }) => (active ? theme.fonts.MEDIUM : theme.fonts.REGULAR)};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const TabComponent = styled.View`
  flex: 1;
`;

export const Indicator = styled(Animated.View)`
  position: absolute;
  bottom: -3px;
  height: 2px;
  width: 10px;
  background-color: ${({ theme }) => theme.colors.primary_black};
`;

export const Card = styled.View<{ active?: boolean }>`
  border-bottom: ${({ active }) => (active ? '2px solid black' : '0')};
`;

export const TabContentTitleOverflow = styled.TouchableOpacity<{ ref: any }>`
  padding-bottom: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
