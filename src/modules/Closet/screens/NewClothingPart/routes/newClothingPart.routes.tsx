import React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { AddNewClothingPart } from '@/modules/Closet/screens/NewClothingPart/screens/AddNewClothingPart';
import { NewClothingPartHome } from '@/modules/Closet/screens/NewClothingPart/screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function NewClothingPartStack() {
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
      <Screen
        name="NewClothingPartHome"
        component={NewClothingPartHome}
        options={{ title: 'Nova peça' }}
      />
      <Screen
        name="AddNewClothingPart"
        component={AddNewClothingPart}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
