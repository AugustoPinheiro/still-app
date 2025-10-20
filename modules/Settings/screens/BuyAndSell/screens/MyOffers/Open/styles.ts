import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const widthImage = (width - 60) / 2;

export const Container = styled.View`
  flex: 1;
  margin-top: 2px;
  padding: 0 20px;
`;

export const ImageContainer = styled(Image)`
  height: ${widthImage}px;
  width: ${widthImage}px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;
