import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Container = styled.TouchableOpacity<{ hiddenBorderBottom?: boolean }>`
  margin-top: 16px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: ${({ hiddenBorderBottom }) => (hiddenBorderBottom ? 0 : 1)}px;
  border-bottom-color: ${({ theme }) => theme.colors.gray05};
  padding-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const UserDataContainer = styled.View``;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 21px;
  text-align: left;
  margin-right: 8px;
`;

export const RemoveIcon = styled.TouchableOpacity`
  margin-left: auto;
`;

export const Icon = styled(FeatherIcon)``;

export const TimeText = styled.Text<{ marginTop?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 18px;
  text-align: left;
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: 8px;
    `}
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
  margin-right: 16px;
`;
