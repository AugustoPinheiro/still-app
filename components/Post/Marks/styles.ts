import { Dimensions, PixelRatio } from 'react-native';

import { Image as ImageFast } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  margin-top: 2px;
`;

export const Content = styled.View`
  width: ${cardWidth}px;
  gap: 8px;
`;

export const Image = styled(ImageFast)`
  width: 100%;
  height: 170px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Photo = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const Line = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  line-height: 21px;
`;

export const TouchToProfile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
