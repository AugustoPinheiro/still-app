import { Dimensions } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { CacheImage as FastImage } from '@/components/CacheImage';
import { DefaultScreen } from '@/components/DefaultScreen';

const { width } = Dimensions.get('window');
const imageWidth = width - 40;
const scale16p9 = 16 / 12;

export const Wrapper = styled(DefaultScreen)``;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const TitleTextAttribute = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ColorContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 4px;
  gap: 8px;
`;

export const TagContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const BrandText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 308px;
  background-color: ${({ theme }) => theme.colors.gray06};
  justify-content: center;
  align-items: center;

  padding: 10px 15px;
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const BackButtonContainer = styled.View`
  position: absolute;
  top: 24px;
  left: 20px;
  z-index: 99;
`;

export const EditButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  right: 20px;
  z-index: 99;
`;

export const Content = styled.View`
  padding: 32px 20px 10px;
  gap: 8px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  gap: 8px;
  /* align-items: center; */
  flex-wrap: wrap;
  margin-top: 16px;
`;

export const ContentAtt = styled.View`
  flex-basis: 45%;
  padding: 8px 20px 0px;
  gap: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
`;

export const OfferButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const OfferButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.colors.primary_black,
}))``;

export const Section = styled.View`
  margin-top: 16px;
  gap: 16px;
  width: 100%;
  padding-left: 20px;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const SectionImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const SectionButton = styled.TouchableOpacity``;

export const SectionClose = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.white};

  position: absolute;
  top: -24px;
  left: 0;
`;

export const ModalImage = styled(Image)`
  width: ${imageWidth}px;
  height: ${imageWidth * scale16p9}px;
`;

export const SectionLink = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 16px;
  bottom: 32px;
`;
