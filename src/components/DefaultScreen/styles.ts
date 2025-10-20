import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styled } from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  edges: ['top', 'right', 'left'],
})<{ hasHeader?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: ${Platform.OS === 'ios' ? 0 : 10}px;
  flex: 1;
`;
