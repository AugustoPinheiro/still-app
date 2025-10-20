import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image as FastImage } from 'expo-image';
import { css, styled } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;
const photoSizeNotification = 45 * fontScale;

export const Container = styled.View``;

export const MenuContainer = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 38px;
  z-index: 99999;
`;

export const Content = styled.View`
  padding: 16px 20px;
  gap: 16px;
`;

export const InfoAndActionsContainer = styled.View`
  flex-direction: row;
`;

export const Clickable = styled.TouchableOpacity``;
export const ClickableImage = styled.TouchableOpacity``;

export const UserDataContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const ActionsContainer = styled.View`
  margin-left: auto;
  flex-direction: row;
`;

export const TextContainer = styled.View`
  flex: 1;
  gap: 4px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 21px;
  text-align: left;
  flex-wrap: wrap;
`;

export const TimeText = styled.Text<{ marginTop?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 21px;
  text-align: left;
`;

export const Icon = styled(FeatherIcon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin-left: 16px;
`;

export const UserPhoto = styled(FastImage)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const NotificationPhoto = styled(FastImage)`
  width: ${photoSizeNotification}px;
  height: ${photoSizeNotification}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray04};
  margin-left: auto;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 21px;
  text-align: left;
`;

export const ContainerButtons = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: ${photoSize + 12}px;
  flex: 1;
  gap: 16px;
`;

export const ButtonContainer = styled.View<{ isOnlyOne?: boolean }>`
  ${({ isOnlyOne }) =>
    isOnlyOne
      ? css`
          width: 60%;
        `
      : css`
          flex: 1;
        `}
`;

export const ContainerNoButton = styled.TouchableOpacity`
  margin-left: 16px;
`;
