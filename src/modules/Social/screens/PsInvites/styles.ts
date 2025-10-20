import { Dimensions, PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image as FastImage } from 'expo-image';
import { styled } from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

const { width } = Dimensions.get('window');

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

export const Card = styled.View`
  margin: 12px 12px 12px 12px;
`;

export const Line = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TouchToProfile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${width - 210}px;
`;

export const Photo = styled(FastImage)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const LabelContainer = styled.View``;

export const LabelName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  margin-left: 8px;
`;

export const SublabelName = styled(LabelName)`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  color: ${({ theme }) => theme.colors.gray02};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  height: 34px;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary_black};
  margin-left: auto;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary_black};
  border-color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonLoading = styled.View`
  width: 53px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  min-width: 100;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const PrimaryButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.white};
`;