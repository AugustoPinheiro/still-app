import { Dimensions, PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = (Dimensions.get('window').width - 40) * fontScale;

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  z-index: 1;
`;

export const FolderPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${240}px;
  border-radius: ${8}px;
  background-color: ${({ theme }) => theme.colors.gray04};
  margin-top: 48px;
  margin-bottom: 32px;
`;

export const ContainerClose = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 6px;
  width: 24px;
  height: 24px;
  z-index: 2;
`;

export const Icon = styled(FeatherIcon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
`;

export const Row = styled.View<{ lessMargin?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
  ${({ lessMargin }) =>
    lessMargin &&
    css`
      margin: 32px 0 0;
    `}
`;

export const SubTitleFolder = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const InfoFolder = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: left;
  margin-bottom: 80px;
`;
