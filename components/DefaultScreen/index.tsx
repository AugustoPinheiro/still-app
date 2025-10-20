import React from 'react';
import { type SafeAreaViewProps } from 'react-native-safe-area-context';

import { Container } from './styles';

interface IDefaultScreenProps extends SafeAreaViewProps {
  hasHeader?: boolean;
}

export function DefaultScreen({ hasHeader = true, ...props }: IDefaultScreenProps) {
  return <Container hasHeader={hasHeader} {...props} />;
}
