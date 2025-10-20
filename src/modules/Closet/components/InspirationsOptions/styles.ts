import styled from 'styled-components/native';

export const BottomSheetContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;
  justify-content: space-evenly;
  flex-direction: row;
`;

export const BottomSheetButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 16px;
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;
