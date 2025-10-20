import { PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Container = styled.View`
  margin-bottom: 8px;
  align-items: flex-start;
  flex-direction: row;
  gap: 8px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const UserDataContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};

  text-align: left;
`;

export const TimeText = styled.Text<{ marginTop?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};

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
  margin-right: 4px;
`;
