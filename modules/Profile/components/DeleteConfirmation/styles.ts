import styled from 'styled-components/native';

export const ContainerModal = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px 20px 20px;
`;
export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  padding: 0 30px;
  text-align: center;
  margin-bottom: 15px;
`;
export const ButtonContainer = styled.View``;
