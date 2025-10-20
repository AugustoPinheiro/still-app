import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BuyAndSellStack } from '@/modules/Settings/screens/BuyAndSell/routes/buyAndSell.routes';
import { ContactUsStack } from '@/modules/Settings/screens/ContactUs/routes/contactUs.routes';
import { FAQStack } from '@/modules/Settings/screens/FAQ/routes/faq.routes';
import { MyAccountStack } from '@/modules/Settings/screens/MyAccount/routes/myaccount.routes';

import { type SettingsStackParamList } from './settings.types';
import { SocialStack } from '@/modules/Social/routes/social.routes';

const { Navigator, Screen } = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="MyAccount" component={MyAccountStack} />
      <Screen name="PsInvites" component={SocialStack} />
      <Screen name="BuyAndSell" component={BuyAndSellStack} />
      <Screen name="FAQ" component={FAQStack} />
      <Screen name="ContactUs" component={ContactUsStack} />
    </Navigator>
  );
}
