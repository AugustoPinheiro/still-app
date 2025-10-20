import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { SearchProvider } from '@/modules/Search/contexts/search.contexts';
import { type SearchStackParamList } from '@/modules/Search/routes/search.types';
import { PostSearchDetails } from '@/modules/Search/screens/PostSearchDetails';

import { InitialSearch } from '../screens/Initial';
import { ListPersons } from '../screens/ListPersons';

const { Navigator, Screen } = createNativeStackNavigator<SearchStackParamList>();

export function SearchStack({ route }) {
  const params = route?.params;

  return (
    <SearchProvider>
      <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderRoute }}>
        <Screen
          name="InitialSearch"
          component={InitialSearch}
          initialParams={{ initial: params?.initial }}
          options={{ headerShown: false }}
        />
        <Screen
          name="ListPersons"
          component={ListPersons}
          options={{ title: 'PERFIS SUGERIDOS' }}
        />
        <Screen
          name="PostSearchDetails"
          component={PostSearchDetails}
          options={{ title: 'POST' }}
        />
      </Navigator>
    </SearchProvider>
  );
}
