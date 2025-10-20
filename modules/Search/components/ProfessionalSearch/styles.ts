import styled, { css } from 'styled-components/native';
import { PixelRatio } from 'react-native';
import { Image } from 'expo-image';

const fontScale = PixelRatio.getFontScale();
const photoSize = 150 * fontScale;
const filterSize = 89 * fontScale;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 3px;
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 20px;
`;

export const LoadgingContent = styled.View`
  position: relative;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22.5px;
  text-align: center;

  margin-top: 66px;
`;

export const ContentInput = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 52px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  text-align: left;
`;

export const Line = styled.View<{ hasMarginTop?: boolean, hasMarginBottom?: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;

  ${({ hasMarginTop }) =>
    hasMarginTop &&
    css`
      margin-top: 16px;
    `}

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: 20px;
    `}
`;

export const Column = styled.TouchableOpacity<{ hasMarginTop?: boolean, hasMarginBottom?: boolean }>`
  flex-direction: column;
  align-items: center;

  ${({ hasMarginTop }) =>
    hasMarginTop &&
    css`
      margin-top: 20px;
    `}

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: 20px;
    `}
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  margin-top: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray05};
  padding-bottom: 8px;
`;

export const FilterButton = styled.TouchableOpacity<{ isActive?: boolean }>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  position: relative;
`;

export const FilterLabel = styled.Text<{ isActive?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary_black : theme.colors.gray02};
  text-align: center;
  line-height: 16px;
`;

export const FilterUnderline = styled.View<{ isActive?: boolean }>`
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary_black : 'transparent'};
  border-radius: 1px;
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

export const FilterPhoto = styled(Image)`
  width: ${filterSize}px;
  height: ${filterSize}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const Empty = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 20px 64px;
  width: 100%;
  height: 300px;
`;

export const ContainerHighlight = styled.View`
  padding: 20px 0 0;
  flex: 1;
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 98;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const CardImageContainer = styled.TouchableOpacity`
  width: 100%;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

// Novos estilos para o design de cards horizontais
export const HorizontalScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 20,
    gap: 12,
  },
})`
  margin-top: 16px;
`;

export const ProfileCard = styled.View<{ isInviteCard?: boolean }>`
  width: 160px;
  height: 220px;
  border-radius: 16px;
  padding: 12px;
  background-color: ${({ theme, isInviteCard }) => 
    isInviteCard ? '#4A90E2' : theme.colors.white};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray04};
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

export const ProfileName = styled.Text<{ isInviteCard?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme, isInviteCard }) => 
    isInviteCard ? theme.colors.white : theme.colors.primary_black};
  text-align: center;
  margin-bottom: 2px;
`;

export const ProfileUsername = styled.Text<{ isInviteCard?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, isInviteCard }) => 
    isInviteCard ? theme.colors.white : theme.colors.gray02};
  text-align: center;
  margin-bottom: 6px;
`;

export const ProfileBio = styled.Text<{ isInviteCard?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, isInviteCard }) => 
    isInviteCard ? theme.colors.white : theme.colors.gray02};
  text-align: center;
  line-height: 14px;
  margin-bottom: 12px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 100%;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  align-items: center;
  justify-content: center;
`;

export const ActionButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const VerifiedBadge = styled.View`
  position: absolute;
  bottom: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #007AFF;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  position: relative;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin: 20px 20px 12px 20px;
`;

export const HighlightCard = styled.View`
  width: 140px;
  height: 100px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 12px;
  padding: 8px;
  flex-direction: row;
  align-items: center;
`;

export const HighlightImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray05};
  margin-right: 8px;
`;

export const HighlightContent = styled.View`
  flex: 1;
`;

export const HighlightTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin-bottom: 2px;
`;

export const HighlightSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const BookmarkIcon = styled.TouchableOpacity`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

// Novos estilos para o layout de perfil + posts
export const StylistSection = styled.View`
  margin-bottom: 32px;
  padding: 0 20px;
  margin-top: 24px;
`;

export const StylistProfileCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
`;

export const StylistProfileImage = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-right: 16px;
  overflow: hidden;
`;

export const StylistProfileImageContent = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const StylistInfo = styled.View`
  flex: 1;
  margin-right: 16px;
`;

export const StylistName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin-bottom: 4px;
  flex: 1;
`;

export const StylistBrand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  margin-bottom: 8px;
`;

export const StylistActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_black};
  padding: 8px 16px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  min-width: 100px;
`;

export const StylistActionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StylistPostsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const StylistPostImage = styled.TouchableOpacity`
  flex: 1;
  height: 200px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray06};
  overflow: hidden;
`;

export const StylistPostImageContent = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const StylistPostPlaceholder = styled.View`
  flex: 1;
  height: 200px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: center;
  justify-content: center;
`;

export const PostPlaceholderText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;