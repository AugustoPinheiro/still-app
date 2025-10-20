import { PixelRatio } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  flex: 1;
  gap: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  padding: 0 30px;

  text-align: center;
`;

export const TitleConfirm = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};

  text-align: center;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  padding: 0 20px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const ProfilesContainer = styled.View`
  flex: 2;
  gap: 8px;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 8px 40px;
`;

export const ProfilePhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;
