import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';

export class NotificationService {
  // Verificar se as notificações estão habilitadas
  static async checkNotificationPermission(): Promise<boolean> {
    try {
      const hasPermission = await OneSignal.Notifications.hasPermission();
      console.log('OneSignal: permissão de notificação:', hasPermission);
      return hasPermission;
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      return false;
    }
  }

  // Solicitar permissão de notificação
  static async requestNotificationPermission(): Promise<boolean> {
    try {
      console.log('OneSignal: solicitando permissão de notificação...');
      const permission = await OneSignal.Notifications.requestPermission(true);
      console.log('OneSignal: permissão concedida:', permission);
      return permission;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  // Configurar usuário no OneSignal
  static async setupUser(userId: string, userData?: any): Promise<void> {
    try {
      // Fazer login do usuário
      OneSignal.login(userId);
      console.log('OneSignal: usuário logado com ID:', userId);

      // Adicionar tags do usuário
      if (userData) {
        if (userData.profile_type) {
          OneSignal.User.addTag('profile_type', userData.profile_type);
        }
        if (userData.username) {
          OneSignal.User.addTag('username', userData.username);
        }
      }

      // Verificar se o dispositivo está inscrito
      const pushSubscriptionId = await OneSignal.User.pushSubscription.getPushSubscriptionId();
      console.log('OneSignal: push subscription ID:', pushSubscriptionId);

    } catch (error) {
      console.error('Erro ao configurar usuário:', error);
    }
  }

  // Remover usuário do OneSignal
  static async removeUser(): Promise<void> {
    try {
      OneSignal.logout();
      console.log('OneSignal: usuário deslogado');
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  }

  // Adicionar tag personalizada
  static async addTag(key: string, value: string): Promise<void> {
    try {
      OneSignal.User.addTag(key, value);
      console.log('OneSignal: tag adicionada:', key, value);
    } catch (error) {
      console.error('Erro ao adicionar tag:', error);
    }
  }

  // Remover tag personalizada
  static async removeTag(key: string): Promise<void> {
    try {
      OneSignal.User.removeTag(key);
      console.log('OneSignal: tag removida:', key);
    } catch (error) {
      console.error('Erro ao remover tag:', error);
    }
  }

  // Verificar status do dispositivo
  static async getDeviceStatus(): Promise<any> {
    try {
      const pushSubscriptionId = await OneSignal.User.pushSubscription.getPushSubscriptionId();
      const hasPermission = await OneSignal.Notifications.hasPermission();
      const isSubscribed = await OneSignal.User.pushSubscription.getOptedIn();
      
      return {
        pushSubscriptionId,
        hasPermission,
        isSubscribed,
        platform: Platform.OS
      };
    } catch (error) {
      console.error('Erro ao obter status do dispositivo:', error);
      return null;
    }
  }

  // Habilitar/desabilitar notificações
  static async setNotificationEnabled(enabled: boolean): Promise<void> {
    try {
      if (enabled) {
        await OneSignal.User.pushSubscription.optIn();
        console.log('OneSignal: notificações habilitadas');
      } else {
        await OneSignal.User.pushSubscription.optOut();
        console.log('OneSignal: notificações desabilitadas');
      }
    } catch (error) {
      console.error('Erro ao alterar status das notificações:', error);
    }
  }

  // Verificar se as notificações estão habilitadas
  static async isNotificationEnabled(): Promise<boolean> {
    try {
      const isOptedIn = await OneSignal.User.pushSubscription.getOptedIn();
      return isOptedIn;
    } catch (error) {
      console.error('Erro ao verificar se notificações estão habilitadas:', error);
      return false;
    }
  }
} 