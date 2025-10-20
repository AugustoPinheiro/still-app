import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  padding-top: 3px;
`;

export const WebviewContent = styled.View<{ ref: any }>`
  flex: 1;
`;

const FloatButton = styled.TouchableOpacity`
  position: absolute;

  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.primary_off_white};
  align-items: center;
  justify-content: center;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ScreeShotFloatButton = styled(FloatButton)`
  bottom: 16px;
  right: 16px;
`;
export const BackFloatButton = styled(FloatButton)`
  bottom: 16px;
  left: 16px;
`;
export const ForwardFloatButton = styled(FloatButton)`
  bottom: 16px;
  left: 80px;
`;

export const ButtonIcon = styled(MaterialCommunityIcons)`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary_black};
`;
