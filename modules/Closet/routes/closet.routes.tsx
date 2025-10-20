import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { ClosetProvider } from '@/modules/Closet/contexts/closet.contexts';
import { ClosetStackParamList } from '@/modules/Closet/routes/closet.types';
import { AllFolders } from '@/modules/Closet/screens/AllFolders';
import { ClosetHome } from '@/modules/Closet/screens/ClosetHome';
import { ClothingDetails } from '@/modules/Closet/screens/ClothingDetails';
import { EditClothingPart } from '@/modules/Closet/screens/EditClothingPart';
import { FolderDetails } from '@/modules/Closet/screens/FolderDetails';
import { NewClothingPartStack } from '@/modules/Closet/screens/NewClothingPart/routes/newClothingPart.routes';
import { NewLookStack } from '@/modules/Closet/screens/NewLook/routes/newLook.routes';
import { NewLookEdit } from '@/modules/Closet/screens/NewLookEdit';

import { AllSuggestions } from '../screens/AllSuggestions';

const { Navigator, Screen } = createNativeStackNavigator<ClosetStackParamList>();

export function ClosetStack({ route, navigation }: any) {
  return (
    <ClosetProvider>
      <Navigator
        initialRouteName={'ClosetHome'}
        screenOptions={{
          animation: 'slide_from_right',
          header: HeaderRoute,
        }}
      >
        <Screen
          name="ClosetHome"
          component={ClosetHome}
          options={{ headerShown: false }}
          initialParams={route}
        />
        <Screen
          name="ClothingDetails"
          component={ClothingDetails}
          options={{ headerShown: false }}
        />
        <Screen
          name="NewClothingPart"
          component={NewClothingPartStack}
          options={{ headerShown: false }}
        />
        <Screen name="NewLook" component={NewLookStack} options={{ headerShown: false }} />
        <Screen name="AllFolders" component={AllFolders} options={{ title: 'MINHAS PASTAS' }} />
        <Screen
          name="FolderDetails"
          component={FolderDetails}
          options={({ route }) => ({
            title: route.params?.title,
          })}
        />
        <Screen
          name="EditClothingPart"
          component={EditClothingPart}
          options={{ headerShown: false }}
        />
        <Screen name="NewLookEdit" component={NewLookEdit} options={{ headerShown: false }} />
        <Screen
          name="AllSuggestions"
          component={AllSuggestions}
          options={{ title: 'SUGESTÕES DE LOOKS' }}
        />
      </Navigator>
    </ClosetProvider>
  );
}
