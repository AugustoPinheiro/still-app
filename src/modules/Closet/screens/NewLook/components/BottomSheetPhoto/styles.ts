import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  padding: 48px 20px;
  gap: 32px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  gap: 16px;
`;
