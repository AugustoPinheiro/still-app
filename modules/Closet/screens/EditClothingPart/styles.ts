import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image as FastImage } from 'expo-image';
import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const Wrapper = styled(DefaultScreen)``;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
})``;

export const SelectContainer = styled.View``;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray03};
  margin-left: 1px;
  margin-bottom: 8px;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const DescriptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
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

export const Content = styled.View`
  flex: 1;
  padding: 32px 20px 0;
  gap: 16px;
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

export const ContentAlert = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray06};
  padding: 8px;
  gap: 8px;
  align-items: center;
`;

export const AlertText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const AlertIcon = styled(MaterialIcons)`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const SwitchContainer = styled.View`
  margin-bottom: 32px;
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SwitchDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ButtonContainer = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const ModalLoadingContainer = styled.View`
  gap: 16px;
`;

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const ModalDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.colors.primary_black,
}))`
  width: 24px;
  height: 24px;
  font-size: 24px;
`;