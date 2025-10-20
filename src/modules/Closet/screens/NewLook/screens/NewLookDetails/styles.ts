import { Image as FastImage } from 'expo-image';
import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

export const Wrapper = styled(DefaultScreen).attrs({
  hasHeader: false,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-left: 0;
  padding-right: 0;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {},
})``;

export const ImageContainer = styled.View`
  width: 100%;
  height: 308px;
  background-color: ${({ theme }) => theme.colors.gray06};
  justify-content: center;
  align-items: center;

  padding: 10px 15px;
`;

export const FloatButtonContainer = styled.View`
  position: absolute;
  top: 24px;
  right: 20px;
  gap: 16px;
  z-index: 1;
`;

export const FloatPrimaryButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.primary_black};
  background-color: ${({ theme }) => theme.colors.primary_black};
  color: ${({ theme }) => theme.colors.primary_black};

  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const FloatSecondaryButton = styled(FloatPrimaryButton)`
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  margin-top: 1px;
  padding: 32px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 16px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px -10px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const BackButtonContainer = styled.View`
  position: absolute;
  top: 24px;
  left: 20px;
  z-index: 99;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const PartsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const PartImageContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.gray06};
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.gray05};

  justify-content: center;
  align-items: center;
`;

export const Section = styled.View`
  gap: 16px;
`;

export const TagContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ButtonContainer = styled.View`
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

export const ModalButtonContainer = styled.View`
  margin-top: 32px;
  padding: 0 20px;
`;

export const ModalPhotoContainer = styled.View`
  height: 416px;
  width: 100%;
  border-radius: 8px;
`;

export const ModalPhotoCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -34px;
  left: 0px;

  height: 24px;
  width: 24px;
`;

export const ModalPhotoBottomButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;

  flex-direction: row;
  justify-content: space-between;

  padding: 0 16px;
`;

export const ModalPhoto = styled(FastImage)`
  width: 100%;
  height: 416px;
  border-radius: 8px;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ColorContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 4px;
  gap: 8px;
`;
