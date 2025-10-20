import styled from 'styled-components/native';

import MastercardIcon from '@/assets/images/mastercarIcon.svg';
import { Button } from '@/components/Button';
import { DefaultScreen } from '@/components/DefaultScreen';

export const ContainerDefault = styled(DefaultScreen)`
  padding-left: 0;
  padding-right: 0;
`;

// margin-top: 19px;
// padding-top: 60px;
// border-top-width: 1px;
// border-top-color: ${({ theme }) => theme.colors.gray06};
export const Container = styled.View`
  flex: 1;
  padding: 0 20px 0;
`;

export const Card = styled.View``;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 15px;
`;

export const CardTextsContainer = styled.View``;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const CardExpirationDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};

  margin-top: 4px;
`;

export const CardIcon = styled(MastercardIcon)`
  margin-right: 30px;
`;

export const CardButton = styled(Button).attrs({
  weight: 'flat',
})`
`;

export const Divider = styled.View`
  margin-bottom: 20px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const ButtonContainer = styled.View`
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray06};
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  min-height: 350px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  padding: 0 32px;
  margin-top: 12px;
`;