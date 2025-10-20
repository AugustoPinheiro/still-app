import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 75 * fontScale;

export const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const UserDataContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 21px;
  text-align: left;
  margin-right: 8px;
`;

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

export const FolderPhoto = styled(Image)<{ hasImage: boolean }>`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${8}px;
  background-color: ${({ theme, hasImage }) =>
    hasImage ? theme.colors.gray04 : theme.colors.gray06};
  margin-right: 13px;
`;

export const Icon = styled(FeatherIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary_black};
`;
export const IconMaterial = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const IconLoading = styled.ActivityIndicator`
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray03};
`;

export const TouchableOpacity = styled.View`
  margin: 27px 0;
  margin-left: auto;
`;

export const ButtonContainer = styled.View`
  margin: 27px 0;
  margin-left: auto;
`;
