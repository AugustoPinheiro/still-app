import { PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import { styled } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 40 * fontScale;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 40px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 32px 32px 0 0;
  margin-top: 101px;
`;

export const Photo = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const LabelName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  line-height: 21px;
  margin-left: 16px;
`;

export const Line = styled.View`
  margin-top: 32px;
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary_black};
  margin-left: auto;
  height: 24px;
`;

export const ButtnoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const TabContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;
