import { MaskedTextInput } from 'react-native-mask-text';

import { styled } from 'styled-components/native';

interface Props {
  marginBottom?: number;
  width?: string;
  error?: boolean;
}

export const Container = styled.View<Props>`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
`;

export const InputMask = styled(MaskedTextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray04,
}))<Props>`
  width: 100%;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.red01 : theme.colors.gray06)};
  border-radius: 4px;
  padding: 12px;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
  background-color: ${({ theme, editable }) =>
    !editable ? theme.colors.gray06 : theme.colors.white};

  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
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
`;
