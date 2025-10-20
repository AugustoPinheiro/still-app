import styled from 'styled-components/native';

export const ContainerDefault = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.View`
  padding: 20px;
  gap: 24px;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 27px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;
