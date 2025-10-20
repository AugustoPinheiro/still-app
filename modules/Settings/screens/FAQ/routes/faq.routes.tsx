import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { FAQList } from '@/modules/Settings/screens/FAQ/screens/List';

import { type FAQStackParamList } from './faq.types';

const { Navigator, Screen } = createNativeStackNavigator<FAQStackParamList>();

export function FAQStack() {
  return (
    <Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: HeaderRoute,
        headerTitleAlign: 'center',
      }}
    >
      <Screen name="FAQList" component={FAQList} options={{ title: 'Dúvidas frequentes' }} />
    </Navigator>
  );
}
