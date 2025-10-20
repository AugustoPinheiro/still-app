import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const cardWidth = (width - 60) / 2;

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Column = styled.View`
  flex-basis: ${cardWidth}px;
  gap: 16px;
`;

export const Card = styled.TouchableOpacity`
  gap: 8px;
  position: relative;
  z-index: 1;
`;

export const CardImageContainer = styled.View<{ hasStyle?: boolean; isOdd?: boolean }>`
  width: 100%;
  height: ${({ hasStyle, isOdd }) => (hasStyle ? (isOdd ? 260 : 170) : 170)}px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardImage = styled(Image)`
  flex: 1;
  border-radius: 8px;
`;

export const CardBottom = styled.View`
  padding: 0 1px;
`;

export const CardBottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardTitle = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 98;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
