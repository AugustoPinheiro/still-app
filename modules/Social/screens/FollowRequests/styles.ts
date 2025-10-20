import { Dimensions, PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const photoSize = 40 * fontScale;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 10px 20px 10px;
`;

export const Line = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TouchToProfile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${width - 210}px;
`;

export const Photo = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const LabelContainer = styled.View``;

export const LabelName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  margin-left: 8px;
`;

export const SublabelName = styled(LabelName)`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  color: ${({ theme }) => theme.colors.gray02};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  height: 34px;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary_black};
  margin-left: auto;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary_black};
  border-color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonLoading = styled.View`
  width: 53px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const PrimaryButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.white};
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  min-width: 100;
`;
