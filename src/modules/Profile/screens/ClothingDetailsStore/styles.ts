import { Dimensions } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const imageWidth = width - 40;
const scale16p9 = 16 / 12;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  gap: 16px;
`;

export const ImageContainer = styled(Image)`
  background-color: ${({ theme }) => theme.colors.gray06};
  width: 100%;
  height: ${imageWidth}px;
  border-radius: 8px;
`;

export const Section = styled.View`
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

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonContainer = styled.View`
  padding: 20px;
  width: 100%;
`;

export const ContentAtt = styled.View`
  gap: 8px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
`;

export const ContentRow = styled.View`
  flex-direction: row;
  gap: 8px;
  /* align-items: center; */
  flex-wrap: wrap;
  margin-top: 16px;
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

export const Icon = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;
