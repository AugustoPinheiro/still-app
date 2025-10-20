import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { Wrapper } from '@/components/Wrapper';
import { DiscoveryProvider } from '@/modules/Discovery/contexts/discovery.contexts';
import { ChooseProfile } from '@/modules/Discovery/screens/ChooseProfile';
import { FashionStyles } from '@/modules/Discovery/screens/FashionStyles';
import { Highlight } from '@/modules/Discovery/screens/Highlight';
import { Objective } from '@/modules/Discovery/screens/Objective';
import { Onboarding } from '@/modules/Discovery/screens/Onboarding';
import { Placeholder } from '@/modules/Discovery/screens/Placeholder';
import { PostDiscoveryDetails } from '@/modules/Discovery/screens/PostDiscoveryDetails';
import { QuestionWrapper } from '@/modules/Discovery/screens/Questionnaire/screens/QuestionWrapper';
import { Result } from '@/modules/Discovery/screens/Questionnaire/screens/Result';
import { RegisterStack } from '@/modules/Discovery/screens/Register/routes/register.routes';

import { type DiscoveryStackParamList } from './discovery.types';

const { Navigator, Screen } = createNativeStackNavigator<DiscoveryStackParamList>();

export function DiscoveryStack() {
  return (
    <Wrapper>
      <DiscoveryProvider>
        <Navigator
          screenOptions={{
            header: HeaderRoute,
            animation: 'slide_from_right',
          }}
        >
          <Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Screen name="ChooseProfile" component={ChooseProfile} options={{ title: ' ' }} />
          <Screen name="Objective" component={Objective} options={{ title: ' ' }} />
          <Screen name="FashionStyles" component={FashionStyles} options={{ title: ' ' }} />
          <Screen name="Placeholder" component={Placeholder} options={{ title: ' ' }} />
          <Screen
            name="Questionnaire"
            component={QuestionWrapper}
            options={{ headerShown: false }}
          />
          <Screen name="Result" component={Result} options={{ headerShown: false }} />
          <Screen name="Register" component={RegisterStack} options={{ headerShown: false }} />
          <Screen name="Highlight" component={Highlight} options={{ title: 'Explorar' }} />
          <Screen
            name="PostDiscoveryDetails"
            component={PostDiscoveryDetails}
            options={{ title: 'POST' }}
          />
        </Navigator>
      </DiscoveryProvider>
    </Wrapper>
  );
}
