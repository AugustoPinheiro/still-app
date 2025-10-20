import styled from 'styled-components/native';

export const BottomSheetContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  z-index: 99;
`;

export const BottomSheetButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray06};
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.gray05 : theme.colors.gray02)};
`;