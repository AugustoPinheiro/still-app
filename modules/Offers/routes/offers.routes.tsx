import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { Evaluation } from '@/modules/Offers/screens/Evaluation';
import { Offers } from '@/modules/Offers/screens/Home';
import { Success } from '@/modules/Offers/screens/Success';
import { Support } from '@/modules/Offers/screens/Support';

const { Navigator, Screen } = createNativeStackNavigator<any>();

export const OffersStack = () => {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ header: HeaderRoute }}>
      <Screen name="Home" component={Offers} options={{ title: 'OFERTAS' }} />
      <Screen name="Evaluation" component={Evaluation} options={{ title: 'AVALIAÇÃO' }} />
      <Screen name="Success" component={Success} options={{ headerShown: false }} />
      <Screen name="Support" component={Support} options={{ title: 'AJUDA' }} />
    </Navigator>
  );
};
