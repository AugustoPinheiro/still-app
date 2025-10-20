import { PixelRatio } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import { Image, ImageProps } from 'expo-image';
import { styled } from 'styled-components/native';

import CalendarIcon from '@/assets/images/calendarIcon.svg';
import { normalize } from '@/services/normalize';

const fontScale = PixelRatio.getFontScale();
const photoSize = 72 * fontScale;

interface ButtonActiveProps {
  isActive?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary_off_white};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: transparent;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 32px 32px 0 0;
  margin-top: 101px;
`;

export const Header = styled.View`
  background-color: transparent;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: ${normalize(-35)}px;
  left: 0;
  right: 0;
  z-index: 99;
  /* background-color: red; */
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity<ButtonActiveProps>`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary_black};
  border-radius: 24px;
  min-width: 120px;
  gap: 8px;
  padding: 3px 16px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary_black : 'transparent'};
`;

export const ButtonText = styled.Text<ButtonActiveProps>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.white : theme.colors.primary_black)};
  text-align: center;
`;

export const HeaderPhoto = styled(Image)<ImageProps>`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const HeaderButtonLeft = styled.View`
  width: 36px;
  height: 36px;
`;

export const HeaderIconLeft = styled(CalendarIcon).attrs({
  width: 16,
  height: 16,
})``;

export const HeaderIconRight = styled(FeatherIcon)`
  font-size: 20px;
  color: #000;
`;

export const HeaderButtonRight = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  elevation: 4;
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22.5px;
  text-align: center;

  margin-top: 66px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 16.8px;
  text-align: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-top: 32px;
  padding: 0 20px;
`;

export const InfoContent = styled.View``;
export const InfoContentButton = styled.TouchableOpacity``;

export const NumberText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  line-height: 21.6px;
`;

export const LabelNumberText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  line-height: 18px;
`;

export const TabContainer = styled.View`
  margin-top: 50px;
  flex: 1;
`;
