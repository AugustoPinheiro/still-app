import { Platform } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { css, styled } from 'styled-components/native';

interface Props {
  marginBottom?: number;
  width?: string;
  error?: boolean;
  disabled?: boolean;
}

export const Container = styled.View<{ width?: string; marginBottom?: number }>`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
`;

export const InputContainer = styled.View`
  width: 100%;
`;

export const RightIcon = styled(FeatherIcon)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray02};
  font-size: 20px;
`;

export const DatePickerContainer = styled.View`
  flex: 1;
  flex-direction: row;

  ${() =>
    Platform.OS === 'ios' &&
    css`
      position: absolute;
      bottom: -34px;
      left: 0;
    `}
`;

export const Input = styled.TouchableOpacity<Props>`
  width: ${({ width }) => width ?? '100%'};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.red01 : theme.colors.gray06)};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray06 : theme.colors.white};
  border-radius: 4px;
  padding: 12px;

  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const InputText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray03};
  margin-left: 1px;
  margin-bottom: 8px;
`;

export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.red01};
  margin-left: 1px;
  margin-top: 2px;
`;

export const SuccessText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.success};
  margin-left: 1px;
  margin-top: 2px;
`;
