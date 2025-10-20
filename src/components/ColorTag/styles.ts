import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 4px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ selected, theme }) =>
    selected &&
    css`
      border: 1px solid ${theme.colors.gray04};
      border-radius: 999px;
    `};
`;

export const ColorIcon = styled.View<{ color: string }>`
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  border-radius: 12px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
