import FeatherIcon from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { styled } from 'styled-components/native';

const photoSize = 32;
const heightImagePost = 560;

export const Container = styled.View`
  max-height: ${heightImagePost + 160}px;
  margin-bottom: 40px;
`;

export const Image = styled(ExpoImage)<ImageProps>`
  width: 100%;
  height: 544px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray06};
  justify-content: center;
  align-items: center;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const MenuContainer = styled.TouchableOpacity`
  position: absolute;
  right: 4px;
  top: 4px;
  background-color: #00000009;
  border-radius: 20px;
  z-index: 1;
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 80;
`;

export const Content = styled.View`
  padding: 8px 20px 0;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 8px;
`;

export const InfoAndActionsContainer = styled.View`
  flex-direction: row;
  height: 40px;
`;

export const DescriptionContainer = styled.View`
  gap: 8px;
`;

export const ShowMoreButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ShowMoreText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 21px;
  text-align: left;
`;

export const CommentsButton = styled.TouchableOpacity`
  height: 18px;
  width: 50%;
`;

export const UserDataContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionsContainer = styled.View`
  margin-left: auto;
  flex-direction: row;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 21px;
  text-align: left;
`;

export const TimeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 18px;
  text-align: left;

  height: 18px;
`;

export const Icon = styled(FeatherIcon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin-left: 16px;
`;

export const IconRotate = styled(FeatherIcon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin-left: 16px;

  transform: rotate(135deg);
`;

export const Icon2 = styled(MaterialCommunityIcons)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  margin-left: 16px;
`;

export const floatIconContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  border-radius: 20px;
  position: absolute;
  right: 20px;
  bottom: 48px;
  justify-content: center;
  align-items: center;
`;

export const FloatIcon = styled(MaterialCommunityIcons)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const UserPhoto = styled(ExpoImage)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 16px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
  text-align: left;
`;
