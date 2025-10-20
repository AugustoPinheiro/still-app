import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 51px 20px;
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: flex-start;
  gap: 51px;
  width: 100%;
  min-height: 70%;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 20%;
`;

export const TextContainer = styled.View`
  gap: 15px;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;
