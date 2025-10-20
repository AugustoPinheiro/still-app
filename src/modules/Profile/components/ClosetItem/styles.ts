import { Dimensions, PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const photoSize = ((width - 60) / 2) * fontScale;
const photoSizeBigger = 260 * fontScale;

export const Container = styled.TouchableOpacity<{ marginAuto?: boolean; hasBg?: boolean }>`
  margin-bottom: 20px;

  ${({ marginAuto }) =>
    !marginAuto &&
    css`
      margin-left: auto;
    `}
`;

export const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${photoSize}px;
  height: ${photoSize}px;
  background-color: #0008;
  z-index: 100000;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const UserPhoto = styled(Image)<{ isBigger?: boolean }>`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;

  ${({ isBigger }) =>
    isBigger &&
    css`
      height: ${photoSizeBigger}px;
    `}
`;

export const SeeAll = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.white};
`;
