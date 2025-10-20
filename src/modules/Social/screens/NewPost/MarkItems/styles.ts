import { Dimensions } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image, ImageProps } from 'expo-image';
import { styled } from 'styled-components/native';

export const widthImage = Dimensions.get('window').width - 40;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px 20px;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 36px 0px 0px;
  flex: 1;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const TextSmall = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  margin-top: 80px;
`;

export const Icon = styled(FeatherIcon)`
  margin-left: 16px;
`;

export const ArrowBackButtonContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 0;
`;

export const ArrowBackButton = styled.TouchableOpacity``;

export const ImageContent = styled(Image)<ImageProps>`
  width: ${widthImage}px;
  height: ${widthImage}px;
  border-radius: 8px;
  align-self: center;
`;

export const Marker = styled.View`
  position: absolute;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  border-radius: 10px;
  height: auto;
  width: auto;
`;

export const MarkerText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerList = styled.View`
  padding: 42px 20px 0px;
  flex: 1;
  gap: 20px;
  justify-content: space-between;
`;
