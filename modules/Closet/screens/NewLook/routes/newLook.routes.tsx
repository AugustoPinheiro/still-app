import React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { NewLookDetails } from '@/modules/Closet/screens/NewLook/screens/NewLookDetails';
import { NewLookHome } from '@/modules/Closet/screens/NewLook/screens/NewLookHome';

const { Navigator, Screen } = createNativeStackNavigator();

export function NewLookStack() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, [navigation]);

  function handleGoCloset() {
    const routes = {
      index: 0,
      routes: [
        {
          name: 'Closet',
        },
      ],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  const Header = (props: any) => <HeaderRoute goBackRoute={handleGoCloset} {...props} />;

  return (
    <Navigator
      screenOptions={{
        header: Header,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="NewLookHome" component={NewLookHome} options={{ title: 'Criar Look' }} />
      <Screen
        name="NewLookDetails"
        component={NewLookDetails as any}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
