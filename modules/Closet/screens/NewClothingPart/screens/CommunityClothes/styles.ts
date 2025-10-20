import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;
const widthPercent = ((width - 18) / 3 / width) * 100;

export const Container = styled.View`
  flex: 1;
  margin-top: 4px;
  padding: 30px 0;
  gap: 16px;
`;

export const Header = styled.View`
  padding: 0 20px;
`;

export const Content = styled.View``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 24px;
  margin-top: 24px;
  align-items: center;
`;

export const CountContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 40px;
  gap: 24px;
  border-radius: 4px;
  padding: 8px 16px;
  gap: 8px;
  margin-top: 16px;

  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const CountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const CountButtonContainer = styled.View``;

export const ButtonIcon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.TouchableOpacity`
  flex-basis: ${widthPercent.toFixed(2)}%;
  height: 205px;
  background-color: ${({ theme }) => theme.colors.gray06};
  justify-content: center;
  align-items: center;
`;

export const ImageContent = styled(Image)`
  flex: 1;
  width: 100%;
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const BottomSheetContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 0 16px 16px;
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;
