import { Platform } from 'react-native';

import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const ContainerDefault = styled(DefaultScreen)`
  padding-left: 0;
  padding-right: 0;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: 28px;
  gap: 32px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderValue = styled.View`
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 7px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const HeaderValueAmount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XL}px;
  color: ${({ theme }) => theme.colors.primary_black};

  text-align: center;
`;

export const HeaderValueText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ExtractContainer = styled.View`
  margin-top: 42px;
  padding: 0 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray06};
`;

export const Extract = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const TransactionContainer = styled.View`
  height: ${Platform.OS === 'ios' ? 385 : 350}px;
`;

export const ButtonContainer = styled.View`
  height: 100px;
  padding: 20px 20px 0;
`;
