import { css, styled } from 'styled-components/native';

type Props = {
  outline?: boolean;
  type?: 'primary' | 'tertiary' | 'success' | 'danger' | 'warning';
};

export const Container = styled.TouchableOpacity<{ marginBottom?: number }>`
  align-items: baseline;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 20}px;
`;

export const Badge = styled.View<Props>`
  padding: 4px 8px;
  background-color: ${({ theme, type }) => 
    type == 'tertiary' 
    ? theme.colors.gray04
    : (type == 'success'
      ? theme.colors.success
      : (type == 'danger'
      ? theme.colors.primary_red
      : theme.colors.gold_yellow))
  };
  border-radius: 100px;
  min-width: 58px;
  justify-content: center;
  align-items: ${({ type }) => (type === 'tertiary' ? 'flex-start' : 'center')};

  ${({ outline, type }) => {
    if (outline) {
      return css`
        padding: 8px;
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) =>
          type == 'tertiary' 
            ? theme.colors.gray04
            : (type == 'success'
              ? theme.colors.success
              : (type == 'danger'
              ? theme.colors.primary_red
              : theme.colors.gold_yellow))
        };
      `;
    }
  }}
`;

export const BadgeText = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
`;
