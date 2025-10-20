// Exemplo de como usar as API Keys do OneSignal no backend
// ⚠️ NUNCA exponha essas chaves no frontend

const ONESIGNAL_REST_API_KEY = 'alpn2fdzceauf7tpmn5g6spr6';
const ONESIGNAL_APP_ID = '0e4144a3-0a94-4281-80df-b6d9fba9a33c';

// Exemplo de envio de notificação push
async function sendPushNotification(userIds, title, message, data = {}) {
  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_external_user_ids: userIds, // IDs dos usuários
        headings: { en: title },
        contents: { en: message },
        data: data, // Dados adicionais
        android_channel_id: 'default', // Canal Android (opcional)
        ios_sound: 'default', // Som iOS (opcional)
      }),
    });

    const result = await response.json();
    console.log('Notificação enviada:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    throw error;
  }
}

// Exemplo de uso
// sendPushNotification(
//   ['user-uuid-1', 'user-uuid-2'], 
//   'Novo evento!', 
//   'Você tem um novo evento agendado',
//   { screen: 'EventDetails', eventId: '123' }
// );

// Exemplo de envio para todos os usuários
async function sendNotificationToAll(title, message, data = {}) {
  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ['Subscribed Users'], // Todos os usuários inscritos
        headings: { en: title },
        contents: { en: message },
        data: data,
      }),
    });

    const result = await response.json();
    console.log('Notificação enviada para todos:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar notificação para todos:', error);
    throw error;
  }
}

// Exemplo de envio baseado em tags
async function sendNotificationByTags(tags, title, message, data = {}) {
  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        filters: [
          { field: 'tag', key: 'user_type', relation: '=', value: 'premium' },
          { field: 'tag', key: 'location', relation: '=', value: 'sao-paulo' }
        ],
        headings: { en: title },
        contents: { en: message },
        data: data,
      }),
    });

    const result = await response.json();
    console.log('Notificação enviada por tags:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar notificação por tags:', error);
    throw error;
  }
}

module.exports = {
  sendPushNotification,
  sendNotificationToAll,
  sendNotificationByTags,
}; 