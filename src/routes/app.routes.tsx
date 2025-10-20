import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { isLogged } from '@/config/mmkvStorage';
import { CameraPage } from '@/modules/Camera';
import { DiscoveryStack } from '@/modules/Discovery/routes/discovery.routes';
import { Login } from '@/modules/Login';
import { OffersStack } from '@/modules/Offers/routes/offers.routes';
import { RecoverStack } from '@/modules/RecoverPass/routes/recoverpass.route';
import { TabRoutes } from '@/routes/tab.routes';

import { type AppStackParamList } from './app.types';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      id="AppRouteStack"
      initialRouteName={isLogged() ? 'TabRoutes' : 'Discovery'}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Screen name="Discovery" component={DiscoveryStack} />
      <Screen name="TabRoutes" component={TabRoutes} />
      <Screen name="Login" component={Login} />
      <Screen name="RecoverPass" component={RecoverStack} />
      <Screen name="Camera" component={CameraPage} />
      <Screen name="Offers" component={OffersStack} options={{ headerShown: false }} />
    </Navigator>
  );
}
