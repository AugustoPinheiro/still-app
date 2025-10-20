import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const imageWidth = width - 40;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 80,
    flexGrow: 1,
    gap: 30,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
`;

export const ImagePost = styled(Image)`
  width: ${imageWidth}px;
  height: ${imageWidth * 1.1}px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
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

export const CardWrapper = styled.View`
  padding: 18px 14px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardUserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CardUserPhoto = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardData = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const RatingContainer = styled.View`
  gap: 4px;
  align-items: flex-start;
  margin-top: 8px;
`;

export const RatingText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ClothingsContainer = styled.View`
  padding: 32px 0;
`;

export const PartsContainer = styled.View`
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

export const Description = styled.Text`
  padding: 44px 0;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ValueText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  margin-top: 8px;
`;

export const CardButtonsContainers = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const CardUserNames = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
`;

export const CardUserUsername = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 15px;
`;

export const CardUserName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const CardCompletedButtonsContainers = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 9px;
  gap: 18px;
`;

export const ContainerList = styled.View``;

export const CancelledText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.red01};
  text-align: center;
`;
