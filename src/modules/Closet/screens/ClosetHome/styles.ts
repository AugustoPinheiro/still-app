import { Dimensions } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

const { width } = Dimensions.get('window');
const imageWidth = width - 20;
const scale16p9 = 16 / 12;

export const Wrapper = styled(DefaultScreen)``;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    // flexGrow: 1,
    // marginBottom: 100,
  },
})`
  background-color: transparent;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const NumbersContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray06};
  padding: 14px 0;
  justify-content: space-evenly;
`;

export const NumberItem = styled.View`
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const NumberValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const NumberLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const TabContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;

export const BottomSheetContainer = styled.View`
  padding-bottom: 70px;
`;

export const MyLookContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_off_white};
  padding: 24px;
  margin: 20px;
  border-radius: 8px;
`;

export const MyLookRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleLook = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const SubtitleLook = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const SectionClose = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};

  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
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

export const Icon = styled(MaterialCommunityIcons)`
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Section = styled.View`
  margin-top: 16px;
  margin-bottom: 20px;
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