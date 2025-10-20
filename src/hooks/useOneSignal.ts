import { useEffect, useState } from 'react';
import { OneSignal } from 'react-native-onesignal';

export const useOneSignal = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const initializeOneSignal = async () => {
      try {
        // Check if OneSignal is initialized
        const deviceState = await OneSignal.User.pushSubscription.getPushSubscriptionId();
        if (deviceState) {
          setIsInitialized(true);
        }
        
        // Check permission
        const permission = await OneSignal.Notifications.hasPermission();
        setHasPermission(permission);
      } catch (error) {
        console.error('Erro ao inicializar OneSignal:', error);
      }
    };

    initializeOneSignal();
  }, []);

  const loginUser = (userId: string) => {
    try {
      OneSignal.login(userId);
      console.log('OneSignal: usuário logado com ID:', userId);
    } catch (error) {
      console.error('Erro ao fazer login no OneSignal:', error);
    }
  };

  const logoutUser = () => {
    try {
      OneSignal.logout();
      console.log('OneSignal: usuário deslogado');
    } catch (error) {
      console.error('Erro ao fazer logout no OneSignal:', error);
    }
  };

  const requestPermission = async () => {
    try {
      const permission = await OneSignal.Notifications.requestPermission(true);
      setHasPermission(permission);
      return permission;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  };

  const sendTag = (key: string, value: string) => {
    try {
      OneSignal.User.addTag(key, value);
      console.log('OneSignal: tag enviada:', key, value);
    } catch (error) {
      console.error('Erro ao enviar tag:', error);
    }
  };

  const removeTag = (key: string) => {
    try {
      OneSignal.User.removeTag(key);
      console.log('OneSignal: tag removida:', key);
    } catch (error) {
      console.error('Erro ao remover tag:', error);
    }
  };

  const setExternalUserId = (userId: string) => {
    try {
      OneSignal.login(userId);
      console.log('OneSignal: external user ID definido:', userId);
    } catch (error) {
      console.error('Erro ao definir external user ID:', error);
    }
  };

  return {
    isInitialized,
    hasPermission,
    loginUser,
    logoutUser,
    requestPermission,
    sendTag,
    removeTag,
    setExternalUserId,
  };
}; 