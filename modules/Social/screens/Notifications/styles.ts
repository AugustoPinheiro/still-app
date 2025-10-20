import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image as FastImage } from 'expo-image';
import { styled } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Section = styled.View`
  margin-bottom: 42px;
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px 20px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Icon = styled(FeatherIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  margin-left: 16px;
`;

export const ArrowBackButtonContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 0;
`;

export const ArrowBackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
  text-align: left;
  margin-left: 20px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const FollowRequestContainer = styled.TouchableOpacity`
  padding: 20px;
  width: 100%;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const Clickable = styled.TouchableOpacity``;

export const UserPhoto = styled(FastImage)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

export const FollowNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  flex-wrap: wrap;
`;

export const FollowDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: left;
`;
