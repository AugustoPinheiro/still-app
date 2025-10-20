import FeatherIcon from '@expo/vector-icons/Feather';
import { css, styled } from 'styled-components/native';

interface Props {
  marginBottom?: number;
  width?: string;
  error?: boolean;
  paddingLeft?: boolean;
  paddingRight?: number;
}

export const Container = styled.View<{ width?: string; marginBottom?: number }>`
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 8}px;
`;

export const InputContainer = styled.View`
  position: relative;
  max-width: 100%;
  flex-direction: row;
`;

export const LeftIcon = styled(FeatherIcon)`
  position: absolute;
  left: 12px;
  top: 16px;

  z-index: 1;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray05};
  font-size: 16px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  position: absolute;
  right: 12px;
  top: 12px;

  z-index: 1;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.gray05};
  font-size: 16px;
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

export const RightIconTextButtom = styled.TouchableOpacity`
  position: absolute;
  right: 12px;

  height: 100%;
  justify-content: center;

  z-index: 1;
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
  justify-content: center;

  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  background-color: ${({ theme, editable }) =>
    !editable ? theme.colors.gray06 : theme.colors.white};

  ${({ paddingLeft }) =>
    paddingLeft &&
    css`
      padding-left: 32px;
    `};

  ${({ paddingRight }) => css`
    padding-right: ${paddingRight || 12}px;
  `};
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

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.purplish_blue};
  line-height: 15px;
`;

export const SuccessText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.success};
  margin-left: 1px;
  margin-top: 2px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
`;

export const RequiredText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.red01};
  margin-left: 1px;
  margin-top: 2px;
`;
