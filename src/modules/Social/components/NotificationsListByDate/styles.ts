import { styled } from 'styled-components/native';

export const Container = styled.View``;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
  text-align: left;
  margin-left: 20px;
`;
