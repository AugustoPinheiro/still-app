import { css } from 'styled-components';
import { styled } from 'styled-components/native';

type ButtonProps = {
  type: 'primary' | 'secondary' | 'warning';
  weight?: 'default' | 'flat';
  marginBottom?: number;
  width?: number;
};

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;

  margin-bottom: ${({ marginBottom }) => marginBottom ?? 20}px;
  padding: 0 12px;

  background-color: ${({ theme, type, disabled }) =>
    disabled
      ? theme.colors.gray05
      : type === 'primary'
        ? theme.colors.primary_black
        : theme.colors.white};

  border: ${({ theme, type, disabled }) =>
    disabled ? 'none' : type === 'secondary' && `1px solid ${theme.colors.primary_black}`};

  ${({ weight }) =>
    weight === 'flat' &&
    css`
      height: 24px;
      border-radius: 12px;
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  font-weight: 600;
  color: ${({ theme, type, disabled }) =>
    type === 'primary' || disabled ? theme.colors.white : theme.colors.primary_black};

  ${({ weight }) =>
    weight === 'flat' &&
    css`
      font-size: ${({ theme }) => theme.fontSizes.XS}px;
      font-family: ${({ theme }) => theme.fonts.REGULAR};
    `}
`;
