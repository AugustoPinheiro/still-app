import FeatherIcon from '@expo/vector-icons/Feather';
import { styled } from 'styled-components/native';

interface Props {
  marginBottom?: number;
  width?: string;
  error?: boolean;
}

export const Container = styled.View<{ width?: string; marginBottom?: number }>`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
`;

export const InputContainer = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
`;

export const RightIcon = styled(FeatherIcon)`
  position: absolute;
  right: 12px;
  top: 16px;

  z-index: 1;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray05};
  font-size: 16px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray04,
}))<Props>`
  width: ${({ width }) => width ?? '100%'};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.red01 : theme.colors.gray06)};
  border-radius: 4px;
  padding: 12px;
  height: ${({ numberOfLines = 1 }) => numberOfLines * 24}px;
  text-align-vertical: top;

  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
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
