import React from 'react';

import { CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderRoute } from '@/components/HeaderRoute';
import { NewLookDetails } from '@/modules/Closet/screens/NewLook/screens/NewLookDetails';
import { NewSuggestions } from '@/modules/Closet/screens/NewSuggestions';
import { AnotherProfileProvider } from '@/modules/Social/contexts/anotherProfile.contexts';
import { SocialContextProvider } from '@/modules/Social/contexts/social.contexts';
import { type SocialStackParamList } from '@/modules/Social/routes/social.types';
import { ClothingDetails } from '@/modules/Social/screens/ClothingDetails';
import { ClothingDetailsStore } from '@/modules/Social/screens/ClothingDetailsStore';
import { FollowRequests } from '@/modules/Social/screens/FollowRequests';
import { Initial } from '@/modules/Social/screens/Initial';
import { ListSaves } from '@/modules/Social/screens/ListSaves';
import { NewPostProvider } from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';
import { Offer } from '@/modules/Social/screens/Offer';
import { PostDetails } from '@/modules/Social/screens/PostDetails';

import { ListClosetByCategory } from '../screens/ListClosetByCategory';
import { NewLook } from '../screens/NewLook';
import { NewPost } from '../screens/NewPost';
import { MarkItems } from '../screens/NewPost/MarkItems';
import { Notifications } from '../screens/Notifications';
import { User } from '../screens/User';
import { PsInvites } from '../screens/PsInvites';

const { Navigator, Screen } = createNativeStackNavigator<SocialStackParamList | any>();

export function SocialStack({ route, navigation }: any) {
  const params = route.params?.params;

  function getMarkItemsTitle(type: string) {
    switch (type) {
      case 'clothing':
        return 'MARCAR ROUPA';
      case 'store':
        return 'MARCAR LOJA';
      case 'personal':
        return 'MARCAR PERSONAL STYLIST';
      case 'person':
        return 'MARCAR PESSOA';
      default:
        return 'MARCAR';
    }
  }

  function handleGoCloset() {
    if (!params?.from) {
      return;
    }

    let routesParams = [];

    switch (params.from) {
      case 'searchPeople':
        routesParams = [
          {
            name: 'Search',
            params: {
              initial: 'people',
            },
          },
        ];
        break;
      case 'searchStores':
        routesParams = [
          {
            name: 'Search',
            params: {
              initial: 'stores',
            },
          },
        ];
        break;
      case 'searchProfessionals':
          routesParams = [
            {
              name: 'Search',
              params: {
                initial: 'professionals',
              },
            },
          ];
          break;
      case 'searchProducts':
        routesParams = [
          {
            name: 'Search',
            params: {
              initial: 'products',
            },
          },
        ];
        break;
      default:
        routesParams = [{ name: params?.from }];
    }

    const routes = {
      index: 0,
      routes: routesParams,
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  const HeaderCustom = (props: any) => (
    <HeaderRoute goBackRoute={params?.from ? handleGoCloset : () => navigation.pop()} {...props} />
  );

  return (
    <SocialContextProvider>
      <AnotherProfileProvider>
        <NewPostProvider>
          <Navigator screenOptions={{ animation: 'slide_from_right', header: HeaderCustom }}>
            <Screen
              name="Social"
              component={Initial}
              options={{ headerShown: false }}
              initialParams={route}
            />
            <Screen
              name="Notifications"
              component={Notifications}
              options={{ title: 'NOTIFICAÇÕES' }}
            />
            <Screen name="NewLook" component={NewLook} options={{ title: 'SELECIONAR IMAGEM' }} />
            <Screen name="NewPost" component={NewPost} options={{ title: 'NOVA PUBLICAÇÃO' }} />
            <Screen
              name="NewPostMarkItems"
              component={MarkItems}
              options={({ route }) => ({ title: getMarkItemsTitle(route.params?.type) })}
            />
            <Screen
              name="SocialListClosetByCategory"
              component={ListClosetByCategory}
              options={{ title: 'PEÇAS' }}
            />
            <Screen name="SocialPostDetails" component={PostDetails} options={{ title: 'POST' }} />
            <Screen
              name="AnotherUserProfile"
              component={User}
              options={({ route }) => ({
                title: route.params?.username,
              })}
            />
            <Screen
              name="SocialClothingDetails"
              component={ClothingDetails}
              options={{ headerShown: false }}
            />
            <Screen
              name="SocialClothingDetailsStore"
              component={ClothingDetailsStore}
              options={{ title: 'COMPRAR PEÇA' }}
            />
            <Screen
              name="SocialListSaves"
              component={ListSaves}
              options={({ route }) => ({
                title: route?.params?.data?.description ?? 'Salvos',
              })}
            />
            <Screen name="SocialOffer" component={Offer} options={{ title: 'OFERTA' }} />
            <Screen
              name="NewSuggestions"
              component={NewSuggestions}
              options={{ title: 'Criar Sugestão' }}
              initialParams={route?.params}
            />
            <Screen
              name="NewLookDetails"
              component={NewLookDetails as any}
              options={{ headerShown: false }}
            />
            <Screen
              name="FollowRequests"
              component={FollowRequests}
              options={{ title: 'Solicitações' }}
            />
            <Screen
              name="PsInvites"
              component={PsInvites}
              options={{ title: 'Convites de personal stylists' }}
            />
          </Navigator>
        </NewPostProvider>
      </AnotherProfileProvider>
    </SocialContextProvider>
  );
}
