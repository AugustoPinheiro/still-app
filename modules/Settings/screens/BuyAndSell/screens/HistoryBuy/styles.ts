import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const ContainerDefault = styled(DefaultScreen)`
  padding-left: 0;
  padding-right: 0;
`;

export const Container = styled.View`
  flex: 1;
  margin-top: 19px;
  padding: 0;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray06};
`;

export const TextPrimary = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const TextSecondary = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Card = styled.View`
  padding: 25px 20px 16px;
  gap: 7px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardStatus = styled.View``;
