import { styled } from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';
import { Dimensions } from 'react-native';

export const Wrapper = styled(DefaultScreen)``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20%;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
  text-align: left;
  width: 100%;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  flex-wrap: wrap;
  max-width: ${Dimensions.get('window').width - 40};
  margin-top: 8px;
`;

export const LogoContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const InputContainer = styled.View`
  width: 97%;
`;

export const ButtonContent = styled.View`
  margin-top: auto;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.purplish_blue};
`;

export const CreateAccountContainer = styled.View`
  width: 100%;
`;

export const CreateAccountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.red01};
  margin-left: 1px;
  margin-top: 2px;
`;
