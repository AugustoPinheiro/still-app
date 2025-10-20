import { PixelRatio } from 'react-native';

import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

const fontScale = PixelRatio.getFontScale();
const photoSize = 24 * fontScale;

export const Container = styled(BottomSheetScrollView)`
  flex: 1;
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 40px;
`;

export const OptionIcon = styled(MaterialCIcon)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray04};
`;

export const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;

export const ProfilePhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray04};
`;
