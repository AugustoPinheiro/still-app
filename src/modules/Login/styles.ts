import { styled } from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const Wrapper = styled(DefaultScreen)``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20%;
  padding: 0 20px;
  gap: 55px;
`;

export const ImagesContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 180px;
  align-items: center;
  justify-content: space-around;
`;

export const LogoContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const InputContainer = styled.View`
  width: 100%;
`;

export const ButtonContent = styled.View`
  margin-top: 20px;
  align-items: center;
  gap: 24px;
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

export const HomologText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
`;
