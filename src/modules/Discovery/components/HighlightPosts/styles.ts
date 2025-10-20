import { Dimensions, PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const photoSize = 180 * fontScale;
const photoSizeBigger = 260 * fontScale;
const cardWidth = (width - 56) / 2;

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ContainerPost = styled.View``;

export const Column = styled.View`
  justify-content: flex-start;
  flex-basis: ${cardWidth}px;
  gap: 16px;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 15px;
  max-width: 130px;
`;

export const UserPhoto = styled(Image)<{ isBigger?: boolean }>`
  width: 100%;
  height: ${photoSize}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray05};
  margin-bottom: 8px;

  ${({ isBigger }) =>
    isBigger &&
    css`
      height: ${photoSizeBigger}px;
    `}
`;

export const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${cardWidth}px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  height: 14px;
  width: 24px;
  justify-content: center;
  align-items: center;
`;
