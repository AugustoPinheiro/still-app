import { Dimensions, Platform } from 'react-native';

import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';

const { width } = Dimensions.get('window');
const containerWidth = width - 40;
const containerHeight = containerWidth * 1.5;

export const Wrapper = styled(DefaultScreen)`
  z-index: 0;
  flex: 1;
  background-color: transparent;
`;

export const WrapperContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.gray06};
  width: 100%;
  margin-top: ${Platform.OS === 'ios' ? 8 : 40}px;
  align-items: center;
  flex: 1;
`;

export const Container = styled.View<{ ref?: any }>`
  width: ${containerWidth}px;
  height: ${containerHeight}px;
  background-color: transparent;
  z-index: 0;
`;

export const ContainerFrame = styled.View`
  position: absolute;
  left: 20px;
  width: ${containerWidth}px;
  height: ${containerHeight}px;
  border: 2px dashed ${({ theme }) => theme.colors.gray05};
  &::after {
    content: '';
    letter-spacing: 5px;
  }
`;

export const DraggableContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 0;
`;

export const BottomSheetHandleContainer = styled.View`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary_black};
  background-color: ${({ theme }) => theme.colors.primary_black};
`;

export const BottomSheetHandleButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`;

export const SideButtonsContainer = styled.View`
  position: absolute;
  z-index: 1;
  right: 16px;
  bottom: 100px;
  gap: 24px;
  padding: 16px 4px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

export const SideButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray06};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary_black};

  align-items: center;
  justify-content: center;
`;

export const TopButton = styled(SideButton)`
  border-radius: 20px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary_black};
`;

export const TopCheckButton = styled(TopButton)`
  background-color: ${({ theme }) => theme.colors.green};
  border: 1px solid ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopFloatButtons = styled.View`
  flex-direction: row;
  position: absolute;
  top: 16px;
  right: 28px;
  gap: 24px;
`;
