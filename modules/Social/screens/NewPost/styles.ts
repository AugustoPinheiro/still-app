import { Dimensions } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { css, styled } from 'styled-components/native';

const { width } = Dimensions.get('screen');
const widthImage = width - 40;
const scale16p9 = 16 / 9;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
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
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding-top: 32px;
`;

export const WrapperButton = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 20px;
  justify-content: flex-end;
  flex: 1;
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

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const OfferText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
`;

export const TextSmall = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
  margin-left: 20px;
  max-width: 280px;
  text-align: left;
  margin-top: 8px;
`;

export const Icon = styled(FeatherIcon)`
  margin-left: 16px;
`;

export const ArrowBackButtonContainer = styled.View`
  position: absolute;
  top: 48px;
  left: 0;
`;

export const ArrowBackButton = styled.TouchableOpacity``;

export const ImageContent = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`;

export const WrapperInput = styled.View`
  padding: 0 20px;
  flex: 1;
`;

export const ContainerOptions = styled.TouchableOpacity<{
  hasMargin?: boolean;
  borderTop?: boolean;
}>`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray05};
  padding: 12px 20px;
  flex-direction: row;
  justify-content: space-between;

  ${({ hasMargin }) =>
    hasMargin &&
    css`
      margin-top: 32px;
    `}
  ${({ borderTop }) =>
    borderTop &&
    css`
      border-top-width: 1px;
      border-top-color: ${({ theme }) => theme.colors.gray05};
    `}
`;

export const WrapperOffer = styled.View`
  margin-top: 32px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperSwith = styled.View`
  margin-top: 8px;
`;

export const ContentRow = styled.View`
  padding: 0 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray04,
}))<{ error?: boolean }>`
  flex: 1;
  ${({ error }) => (error ? `border: 1px solid red; border-radius: 4px;` : '')}
`;

export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.red01};
  margin-left: 1px;
  margin-top: 2px;
`;

export const ModalImage = styled(Image)`
  width: 100%;
  height: ${widthImage * scale16p9}px;
  border-radius: 16px;
`;
