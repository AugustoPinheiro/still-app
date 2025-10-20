import { Dimensions, PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');
const imageWidth = width - 40;

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Wrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    // paddingBottom: 80,
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  gap: 32px;
`;

export const PostContainer = styled.View`
  gap: 18px;
`;

export const UserDetailContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ImagePost = styled(Image)`
  width: ${imageWidth}px;
  height: ${imageWidth * 1.1}px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const UserDataContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 16px;
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

export const RatingContainer = styled.View`
  gap: 4px;
  align-items: flex-end;
`;

export const RatingText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const Section = styled.View`
  margin-top: 16px;
  gap: 21px;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const PartsContainer = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: center;
  justify-content: center;
`;

export const PartsImage = styled(Image)`
  width: 55px;
  height: 55px;
  border-radius: 3px;
`;

export const PartsOverlay = styled.View`
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const SwitchContainer = styled.View<{ hasError?: boolean }>`
  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.error};
      border-radius: 3px;
    `}
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SwitchText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  flex: 1;
`;

export const SwitchDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
  margin-bottom: 18px;
`;
