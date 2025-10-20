import { css, styled } from 'styled-components/native';

type Props = {
  selected?: boolean;
  outline?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary';
};

export const Container = styled.TouchableOpacity<{ marginBottom?: number }>`
  align-items: baseline;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 20}px;
  margin-right: 12px;
`;

export const Tag = styled.View<Props>`
  padding: ${({ type }) => (type === 'tertiary' ? `4px 0px` : `4px 8px`)};
  background-color: ${({ theme, type }) =>
    type === 'tertiary' ? theme.colors.white : theme.colors.gray06};
  border-radius: 100px;
  min-width: 58px;
  justify-content: center;
  align-items: ${({ type }) => (type === 'tertiary' ? 'flex-start' : 'center')};

  ${({ outline }) => {
    if (outline) {
      return css`
        padding: 8px;
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.gray04};
      `;
    }
  }}

  ${({ selected, type = 'primary' }) => {
    if (selected) {
      return css`
        background-color: ${({ theme }) =>
          type === 'primary' ? theme.colors.primary_red : theme.colors.primary_black};
        border: 1px solid
          ${({ theme }) =>
            type === 'primary' ? theme.colors.primary_red : theme.colors.primary_black};
      `;
    }
  }}
`;

export const TagText = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray03)};
  text-align: left;
`;
