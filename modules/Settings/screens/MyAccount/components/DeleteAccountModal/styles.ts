import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px 20px 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  padding: 0 30px;

  text-align: center;

  margin-bottom: 15px;
`;

export const TitleConfirm = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};

  text-align: center;

  margin-bottom: 15px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  padding: 0 20px;

  margin-bottom: 32px;
`;

export const ButtonContainer = styled.View``;
