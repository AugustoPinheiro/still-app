import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { Loading } from '@/components/Loading';
import { BottomSheetProvider } from '@/contexts/BottomSheet.contexts';

import { AppRoutes } from './app.routes';

const prefix = Linking.createURL('');

export function Routes() {
  const linking = {
    prefixes: [prefix, 'br.com.stillapp://', 'https://app.fintiapp.com.br'],
    config: {
      screens: {
        Discovery: 'discovery',
        Login: 'login',
        RecoverPass: {
          path: 'recover/:email',
          screens: {
            Code: 'code',
            NewPassword: 'newpassword'
          }
        },
        TabRoutes: {
          path: 'home',
          screens: {
            Feed: {
              path: 'feed',
              screens: {
                AnotherUserProfile: 'user/:username',
                SocialClothingDetails: 'clothing/:username/:id',
                PsInvites: 'ps-invites'
              },
            },
            PostDetails: 'feed/post/:postId',
            Search: 'search',
            AllSuggestions: 'closet/my-suggestions',
            Profile: {
              path: 'profile',
              screens: {
                Orders: 'orders',
                MyServices: 'my-services'
              }
            },
            Chat: 'chat',
            Offers: {
              path: 'offers',
              screens: {
                Home: '/:offerId/:postId',
              },
            },
          },
        },
        Offers: {
          path: 'offers',
          screens: {
            Home: '/:offerId/:postId',
            Support: '/support/:offerId',
          },
        },

        NotFound: '*',
      },
    },
  };

  return (
    <BottomSheetProvider>
      <NavigationContainer linking={linking} fallback={<Loading hasBackground={false} />}>
        <AppRoutes />
      </NavigationContainer>
    </BottomSheetProvider>
  );
}
