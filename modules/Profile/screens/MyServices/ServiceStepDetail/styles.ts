import { PixelRatio, Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';
import FeatherIcon from '@expo/vector-icons/Feather';

import { DefaultScreen } from '@/components/DefaultScreen';
import { Button } from '@/components/Button';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Wrapper = styled(DefaultScreen)`
  padding: 0 24px;
`;

export const Container = styled.View`
  flex: 1;
`;


export const ContainerProgressBar = styled.View`
  gap: 16px;
  margin-bottom: 18px;
`;

export const ProgressBarText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: left;
`;

export const Card = styled.TouchableOpacity`
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray05};
  margin-bottom: 12px;
  padding: 0 18px;
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
  padding: 12px 0;
  width: 100%;
`;

export const CardTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-transform: uppercase;
`;

export const CardText = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
  margin-bottom: 18px;
`;

export const Text = styled.Text<{ textAlign?: string}>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
  margin-bottom: 18px;
`;

export const TextGray = styled.Text<{ textAlign?: string }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
  margin-bottom: 12px;
`;

export const TextGrayBold = styled.Text<{ textAlign?: string }>`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
  margin-bottom: 12px;
`;

export const Row = styled.View<{ align?: string }>`
  flex-direction: row;
  justify-content: ${({ align }) => align ? align : 'space-between'};
  margin-bottom: 18px;
`;

export const Icon = styled(FeatherIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.success}
`;

export const PdfButton = styled(Button).attrs({
  weight: 'flat',
})`
  margin-top: 12px;
`;