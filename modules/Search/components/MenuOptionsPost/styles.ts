import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray05};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 20px 16px;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-transform: uppercase;
`;
