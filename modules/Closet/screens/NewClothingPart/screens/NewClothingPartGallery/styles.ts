import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;
const widthPercent = ((width - 16) / 3 / width) * 100;

export const Container = styled.View`
  flex: 1;
  padding-top: 8px;
`;

export const ContainerPermissions = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 0 20px;
`;

export const ImageContainer = styled.TouchableOpacity`
  flex-basis: ${widthPercent.toFixed(2)}%;
  height: 205px;
`;

export const Image = styled(Animated.Image)`
  height: 205px;
`;

export const CropperWrapper = styled.View`
  flex: 1;
  background-color: #000000dd;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

export const TextPermission = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
  padding: 0 32px;
  margin-top: 12px;
`;

export const SelectContainer = styled.View`
  padding: 0 2px 4px 2px;
  z-index: 1;
`;
