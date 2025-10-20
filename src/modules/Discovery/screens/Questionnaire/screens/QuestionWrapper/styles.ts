import { styled } from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const Container = styled(DefaultScreen)`
  padding: 20px;
`;

export const CounterText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-transform: uppercase;

  margin-top: 14px;
  margin-bottom: 7px;
`;

export const BackButtonWrapper = styled.View`
  margin-bottom: 20px;
`;
