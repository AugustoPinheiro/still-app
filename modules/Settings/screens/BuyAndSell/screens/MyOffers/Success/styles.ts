import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  gap: 52px;
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  align-items: flex-end;
`;
