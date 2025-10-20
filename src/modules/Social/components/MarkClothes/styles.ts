import FeatherIcon from '@expo/vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 20px;
`;

export const BottomSheetContainer = styled.View<{ isSelecting?: boolean }>`
  flex: 1;
  background-color: ${({ theme, isSelecting }) =>
    !isSelecting ? theme.colors.gray05 : theme.colors.primary_black};
  align-items: center;
  justify-content: center;
`;

export const BottomSheetButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px 20px 20px;
`;

export const Icon = styled(FeatherIcon)`
  margin-left: 16px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ArrowBackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  left: 1px;
  width: 40px;
  height: 40px;
  z-index: 1;
`;
