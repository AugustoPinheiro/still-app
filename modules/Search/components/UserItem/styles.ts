import { PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 82 * fontScale;

export const Container = styled.TouchableOpacity`
  align-items: center;
  width: ${photoSize}px;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;
