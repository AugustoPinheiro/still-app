const axios = require('axios');

// Configurações do OneSignal
const ONESIGNAL_APP_ID = '0e4144a3-0a94-4281-80df-b6d9fba9a33c';
const REST_API_KEY = 'alpn2fdzceauf7tpmn5g6spr6';

// Função para enviar notificação de teste
async function sendTestNotification(userIds = [], title = 'Teste', message = 'Esta é uma notificação de teste') {
  try {
    const notification = {
      app_id: ONESIGNAL_APP_ID,
      included_segments: userIds.length > 0 ? [] : ['All'], // 'All' para todos os usuários
      include_external_user_ids: userIds.length > 0 ? userIds : undefined,
      headings: { en: title },
      contents: { en: message },
      data: {
        screen: 'Home',
        test: true,
        timestamp: new Date().toISOString()
      },
      android_channel_id: 'default',
      ios_sound: 'default',
      android_sound: 'default'
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      notification,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${REST_API_KEY}`
        }
      }
    );

    console.log('✅ Notificação enviada com sucesso!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar notificação:', error.response?.data || error.message);
    throw error;
  }
}

// Função para enviar notificação para usuário específico
async function sendNotificationToUser(userId, title, message, data = {}) {
  return sendTestNotification([userId], title, message, data);
}

// Função para enviar notificação para todos os usuários
async function sendNotificationToAll(title, message, data = {}) {
  return sendTestNotification([], title, message, data);
}

// Função para enviar notificação por tags
async function sendNotificationByTags(tags, title, message, data = {}) {
  try {
    const notification = {
      app_id: ONESIGNAL_APP_ID,
      included_segments: [],
      filters: tags.map(tag => ({
        field: 'tag',
        key: tag.key,
        relation: '=',
        value: tag.value
      })),
      headings: { en: title },
      contents: { en: message },
      data: {
        ...data,
        timestamp: new Date().toISOString()
      },
      android_channel_id: 'default',
      ios_sound: 'default',
      android_sound: 'default'
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      notification,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${REST_API_KEY}`
        }
      }
    );

    console.log('✅ Notificação enviada por tags com sucesso!');
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar notificação por tags:', error.response?.data || error.message);
    throw error;
  }
}

// Exemplos de uso
async function runTests() {
  console.log('🚀 Iniciando testes de notificação...\n');

  try {
    // Teste 1: Notificação para todos os usuários
    console.log('📢 Teste 1: Enviando notificação para todos os usuários...');
    await sendNotificationToAll(
      '🔔 Teste de Notificação',
      'Esta é uma notificação de teste para verificar se o OneSignal está funcionando!',
      { screen: 'Home', test: true }
    );

    // Teste 2: Notificação para usuário específico (substitua pelo ID real)
    console.log('\n👤 Teste 2: Enviando notificação para usuário específico...');
    // await sendNotificationToUser(
    //   'user-uuid-here',
    //   '👋 Olá!',
    //   'Esta notificação é apenas para você!',
    //   { screen: 'Profile', userId: 'user-uuid-here' }
    // );

    // Teste 3: Notificação por tags
    console.log('\n🏷️ Teste 3: Enviando notificação por tags...');
    await sendNotificationByTags(
      [{ key: 'profile_type', value: 'professional' }],
      '💼 Oferta Especial',
      'Apenas para personal stylists: oferta especial disponível!',
      { screen: 'Offers', special: true }
    );

    console.log('\n✅ Todos os testes concluídos com sucesso!');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error);
  }
}

// Executar testes se o arquivo for executado diretamente
if (require.main === module) {
  runTests();
}

module.exports = {
  sendTestNotification,
  sendNotificationToUser,
  sendNotificationToAll,
  sendNotificationByTags,
  runTests
}; 