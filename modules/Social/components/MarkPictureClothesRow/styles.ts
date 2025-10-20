import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 48 * fontScale;

export const Container = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: flex-start;
  flex-direction: row;
  padding-bottom: 16px;
  gap: 14px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const UserDataContainer = styled.View`
  flex: 1;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const RemoveIcon = styled.TouchableOpacity`
  height: ${photoSize}px;
  justify-content: center;
`;

export const Icon = styled(FeatherIcon)`
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const UserPhotoContainer = styled.View`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.gray05};
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: 8px;
`;
