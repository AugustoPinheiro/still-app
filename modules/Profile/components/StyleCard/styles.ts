import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary_off_white};
  gap: 16px;
  border-radius: 8px;
`;

export const TextsContainer = styled.View`
  width: 100%;
  gap: 8px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  color: ${({ theme }) => theme.colors.gray02};
`;
