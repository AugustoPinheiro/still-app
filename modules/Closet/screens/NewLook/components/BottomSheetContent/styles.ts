import { Dimensions } from 'react-native';

import { Image, ImageProps } from 'expo-image';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;
const widthPercent = ((width - 40) / 3 / width) * 100;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;
  margin-top: -20px;
  width: 100%;
`;

export const Header = styled.View`
  padding: 27px 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  text-align: center;
`;

export const ItemContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.white};
  flex-basis: ${widthPercent.toFixed(2)}%;

  height: 96px;
  border-radius: 8px;
  padding: 13px 18px;
`;

export const ImageContent = styled(Image)<ImageProps>`
  flex: 1;
  width: 100%;
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0px 20px 32px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  text-align: center;
  margin-top: 20px;
`;
