import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  gap: 24px;
  padding: 20px;
`;

export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 27px;
`;

export const ItemTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;
