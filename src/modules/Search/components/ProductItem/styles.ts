import { Dimensions, PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const { width } = Dimensions.get('window');
const photoSizeSmaller = 20 * fontScale;
const cardWidth = width / 2 - 30;

export const Container = styled.TouchableOpacity``;

export const LabelSmall = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  flex: 1;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  flex: 1;
`;

export const WrapperPicture = styled.View`
  width: ${cardWidth}px;
  height: 150px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

export const ProductPhoto = styled(Image)<{ isSmaller?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};

  ${({ isSmaller }) =>
    isSmaller &&
    css`
      width: ${photoSizeSmaller}px;
      height: ${photoSizeSmaller}px;
      border-radius: ${photoSizeSmaller / 2}px;
      margin-bottom: 0px;
    `}
`;

export const UserPhoto = styled(Image)<{ isSmaller?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};

  ${({ isSmaller }) =>
    isSmaller &&
    css`
      width: ${photoSizeSmaller}px;
      height: ${photoSizeSmaller}px;
      border-radius: ${photoSizeSmaller / 2}px;
      margin-bottom: 0px;
    `}
`;

export const Line = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const ButtonOptions = styled.TouchableOpacity``;
