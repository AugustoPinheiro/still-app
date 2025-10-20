import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 36px;
`;

export const TextContainer = styled.View`
  gap: 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
  padding: 0 36px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
