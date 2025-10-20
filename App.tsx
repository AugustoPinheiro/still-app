import React, { useEffect, useState } from 'react';
import { LogBox, PermissionsAndroid, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import * as amplitude from '@amplitude/analytics-react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import {
  useFonts as useFontsRaleway,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
  useFonts as useFontsUnbounded,
  Unbounded_400Regular,
  Unbounded_600SemiBold,
  Unbounded_700Bold,
} from '@expo-google-fonts/unbounded';
import {
  useFonts as useFontsRoboto,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';

import { Loading } from '@/components/Loading';
import { Toast } from '@/components/Toast';
import { COMETCHAT_APP_ID, COMETCHAT_REGION } from '@/config/cometChat';
import { EXPO_PUBLIC_AMPLITUDE_API_KEY, EXPO_PUBLIC_IS_DEV } from '@/config/env';
import { initializeOneSignal, setupNotificationHandlers, loginOneSignalUser } from '@/config/oneSignal';
import { setChatInit, setIsChatConnected, getProfile, isLogged } from '@/config/mmkvStorage';
import { ToastProvider } from '@/contexts/Toast.contexts';

import { Routes } from './src/routes';
import theme from './src/theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

setDefaultOptions({
  locale: ptBR,
});

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [fontsLoadedRaleway] = useFontsRaleway({
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const [fontsLoadedUnbounded] = useFontsUnbounded({
    Unbounded_400Regular,
    Unbounded_600SemiBold,
    Unbounded_700Bold,
  });

  const [fontsLoadedRoboto] = useFontsRoboto({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const fontsLoaded = fontsLoadedRaleway && fontsLoadedUnbounded && fontsLoadedRoboto;

  // OneSignal Initialization
  useEffect(() => {
    const initializeOneSignalApp = async () => {
      try {
        // Set OneSignal log level
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);

        // Initialize OneSignal
        const success = initializeOneSignal();
        
        if (success) {
          // Setup notification handlers
          setupNotificationHandlers();
          
          // Set up user ID if user is logged in
          const profile = getProfile();
          if (profile?.uuid) {
            loginOneSignalUser(profile.uuid);
            
            // Verificar status das notificações
            const hasPermission = await OneSignal.Notifications.hasPermission();
            const isSubscribed = await OneSignal.User.pushSubscription.getOptedIn();
            
            console.log('OneSignal Status:', {
              hasPermission,
              isSubscribed,
              userId: profile.uuid
            });
          }
        }
      } catch (error) {
        console.error('Erro na inicialização do OneSignal:', error);
      }
    };

    initializeOneSignalApp();
  }, []);

  async function getPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ]);

      if (granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      }

      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }

      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      }

      if (granted['android.permission.READ_MEDIA_IMAGES'] !== PermissionsAndroid.RESULTS.GRANTED) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
      }
    }
  }

  function initCometchat() {
    const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMETCHAT_REGION)
      .autoEstablishSocketConnection(true)
      .build();

    CometChat.init(COMETCHAT_APP_ID, appSetting).then(
      (initialized: boolean) => {
        setChatInit(initialized);
      },
      () => {
        setChatInit(false);
      }
    );
  }

  function listenerCometchat() {
    const listenerID: string = 'COMET_CHAT_UNIQUE_LISTENER_ID';
    CometChat.addConnectionListener(
      listenerID,
      new CometChat.ConnectionListener({
        onConnected: () => {
          setIsChatConnected(true);
        },
        inConnecting: () => {},
        onDisconnected: () => {
          setIsChatConnected(false);
        },
      })
    );
  }

  useEffect(() => {
    try {
      initCometchat();
      listenerCometchat();
      console.log('IS_DEV:', process.env?.EXPO_PUBLIC_IS_DEV);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded && isInitialized) {
      SplashScreen.hideAsync();
      getPermissions();
    }
  }, [fontsLoaded, isInitialized]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar style="dark" backgroundColor="#FFF" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Toast />
              {fontsLoaded ? <Routes /> : <Loading />}
            </ToastProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}