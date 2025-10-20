import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');
const photoSize = (width - 60) / 2;
const photoSizeBigger = 260;

export const Container = styled.View<{ marginAuto?: boolean }>`
  margin-bottom: 20px;

  ${({ marginAuto }) =>
    !marginAuto &&
    css`
      margin-left: auto;
    `}
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 15px;
  max-width: 130px;
`;

export const UserPhoto = styled(Image)<{ isBigger?: boolean }>`
  min-width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;

  ${({ isBigger }) =>
    isBigger &&
    css`
      height: ${photoSizeBigger}px;
    `}
`;

export const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${photoSize}px;
`;

export const ButtonOptions = styled.TouchableOpacity``;
