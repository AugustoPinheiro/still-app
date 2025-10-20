import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 20px;
  width: 100%;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  width: 100%;
`;
