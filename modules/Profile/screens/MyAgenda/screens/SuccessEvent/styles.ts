import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonContainer = styled.View`
  padding: 0 20px;
  margin-top: 24px;
  gap: 20px;
  width: 100%;
`;
