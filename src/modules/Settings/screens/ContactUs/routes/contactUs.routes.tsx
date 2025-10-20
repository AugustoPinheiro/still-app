import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { ContactUs } from '@/modules/Settings/screens/ContactUs/screens/Home';

import { type ContactUsStackParamList } from './contactUs.types';

const { Navigator, Screen } = createNativeStackNavigator<ContactUsStackParamList>();

export function ContactUsStack() {
  return (
    <Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: HeaderRoute,
        headerTitleAlign: 'center',
      }}
    >
      <Screen name="Home" component={ContactUs} options={{ title: 'Fale com a Still' }} />
    </Navigator>
  );
}
