import { PixelRatio } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Wrapper = styled(DefaultScreen)`
  padding: 0 24px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  min-height: 350px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  padding: 0 32px;
  margin-top: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin-bottom: 18px;
`;

export const Card = styled.TouchableOpacity`
  margin-bottom: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray05};
`;

export const CardImageContainer = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray06};
  border-radius: 0 0 8px 8px;
`;

export const CardImage = styled(Image)`
  flex: 1;
  border-radius: 0 0 8px 8px;
`;

export const CardTop = styled.View`
  padding: 12px 12px 12px 12px;
  width: 100%;
`;

export const CardTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 16px;
`;

export const CardTitle = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const CardTime = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const floatIconContainer1 = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const FloatIcon1 = styled(MaterialCommunityIcons)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const floatIconContainer2 = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  border-radius: 20px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const FloatIcon2 = styled(MaterialCommunityIcons)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;
