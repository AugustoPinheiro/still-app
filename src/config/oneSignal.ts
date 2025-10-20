import { OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

// OneSignal App ID
export const ONESIGNAL_APP_ID = Constants?.expoConfig?.extra?.oneSignalAppId;

// ⚠️ IMPORTANTE: API Keys devem ser usadas APENAS no backend
// NUNCA exponha as API Keys no código do app
// 
// Suas API Keys:
// - REST API Key: alpn2fdzceauf7tpmn5g6spr6
// - Legacy API Key: cvwrffoeaepq5xqlzf33xm6ky
// - Key ID: jrundwt65ewouxf46d34mi3di

// OneSignal Configuration
export const initializeOneSignal = () => {
  if (!ONESIGNAL_APP_ID) {
    console.warn('OneSignal App ID não encontrado');
    return false;
  }

  try {
    // Initialize OneSignal
    OneSignal.initialize(ONESIGNAL_APP_ID);
    
    // Request notification permission
    OneSignal.Notifications.requestPermission(true);
    
    console.log('OneSignal inicializado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao inicializar OneSignal:', error);
    return false;
  }
};

// Notification Handlers
export const setupNotificationHandlers = () => {
  // Handle notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
    // Handle notification click here
    // You can navigate to specific screens based on the notification data
  });

  // Handle foreground notifications
  OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
    console.log('OneSignal: notification received in foreground:', event);
    
    // Display the notification without modifications to prevent [modified] tag
    const notification = event.getNotification();
    event.getNotification().display();
  });

  // Handle permission changes
  OneSignal.Notifications.addEventListener('permissionChange', (event) => {
    console.log('OneSignal: permission changed:', event);
  });
};

// User Management
export const loginOneSignalUser = (userId: string) => {
  try {
    OneSignal.login(userId);
    console.log('OneSignal: usuário logado com ID:', userId);
  } catch (error) {
    console.error('Erro ao fazer login no OneSignal:', error);
  }
};

export const logoutOneSignalUser = () => {
  try {
    OneSignal.logout();
    console.log('OneSignal: usuário deslogado');
  } catch (error) {
  console.error('Erro ao fazer logout no OneSignal:', error);
  }
};

// Tags Management
export const addOneSignalTag = (key: string, value: string) => {
  try {
    OneSignal.User.addTag(key, value);
    console.log('OneSignal: tag adicionada:', key, value);
  } catch (error) {
    console.error('Erro ao adicionar tag:', error);
  }
};

export const removeOneSignalTag = (key: string) => {
  try {
    OneSignal.User.removeTag(key);
    console.log('OneSignal: tag removida:', key);
  } catch (error) {
    console.error('Erro ao remover tag:', error);
  }
};

// Send notification to specific user
export const sendNotificationToUser = async (userId: string, title: string, message: string, data?: any) => {
  try {
    // This would typically be done from your backend
    // OneSignal SDK doesn't support sending notifications directly
    console.log('Para enviar notificação, use a API do OneSignal no backend');
    console.log('User ID:', userId);
    console.log('Title:', title);
    console.log('Message:', message);
    console.log('Data:', data);
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}; 