import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

const { width } = Dimensions.get('window');
const photoSize = (width - 60) / 2;
const photoSizeBigger = 260;

export const Container = styled.TouchableOpacity<{ marginAuto?: boolean }>`
  margin-bottom: 20px;

  ${({ marginAuto }) =>
    !marginAuto &&
    css`
      margin-left: auto;
    `}
`;

export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
  line-height: 15px;
`;

export const UserPhotosContainer = styled.View`
  width: ${photoSize}px;
  height: ${photoSize}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

export const UserPhoto = styled(Image)<{ isBigger?: boolean }>`
  width: ${photoSize}px;
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

export const UserPhotoMore = styled(Image)<{ index: number }>`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.gray06};

  ${({ index }) => {
    switch (index) {
      case 0:
        return css`
          border-top-left-radius: 8px;
        `;
      case 1:
        return css`
          border-top-right-radius: 8px;
        `;
      case 2:
        return css`
          border-bottom-left-radius: 8px;
        `;
      case 3:
        return css`
          border-bottom-right-radius: 8px;
        `;
      default:
        return '';
    }
  }}
`;
