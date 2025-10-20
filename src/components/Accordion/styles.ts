import { Animated } from 'react-native';

import FeatherIcon from '@expo/vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  gap: 8px;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};

  flex: 1;
`;

export const Icon = styled(FeatherIcon)`
  width: 24px;
  height: 24px;
  font-size: 24px;
`;

export const AnimatedContent = styled(Animated.View)``;

export const Content = styled(Animated.View)`
  height: auto;
  padding-bottom: 12px;
  padding-left: 4px;
  padding-right: 24px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
  text-align: justify;
`;
