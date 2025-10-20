import { Platform } from 'react-native';

import Constants from 'expo-constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  padding: 20px 20px 10px;
  padding-top: ${Constants.statusBarHeight + (Platform.OS === 'ios' ? 20 : 10)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  padding-right: 24px;
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;
