import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';

import { Code } from '../screens/Code';
import { RecoverPass } from '../screens/Initial';
import { NewPassword } from '../screens/NewPassword';
import { RecoverStackParamList } from './recoverpass.types';

const { Navigator, Screen } = createNativeStackNavigator<RecoverStackParamList>();

export function RecoverStack({ route, navigation }: any) {
  return (
    <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderRoute }}>
      <Screen name="RecoverPass" component={RecoverPass} options={{ headerShown: false }} initialParams={route?.params} />
      <Screen name="Code" component={Code} options={{ headerShown: false }} />
      <Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />
    </Navigator>
  );
}
