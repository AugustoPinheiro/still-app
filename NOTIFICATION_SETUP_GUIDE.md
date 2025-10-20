# 🔔 Guia para Religar Notificações Push

Este guia explica como religar e configurar as notificações push do OneSignal no app.

## 📋 Status Atual

✅ **OneSignal configurado** com App ID: `0e4144a3-0a94-4281-80df-b6d9fba9a33c`  
✅ **Componentes criados** para gerenciar permissões  
✅ **Serviços implementados** para controle de notificações  
✅ **Scripts de teste** prontos para uso  

## 🚀 Como Religar as Notificações

### 1. **Verificar Configuração Atual**

O OneSignal já está configurado no `App.tsx` e será inicializado automaticamente quando o app abrir.

### 2. **Solicitar Permissão do Usuário**

Use o componente `NotificationPermission` para solicitar permissão:

```typescript
import { NotificationPermission } from '@/components/NotificationPermission';

<NotificationPermission
  onPermissionGranted={() => console.log('Permissão concedida!')}
  onPermissionDenied={() => console.log('Permissão negada!')}
/>
```

### 3. **Usar o Serviço de Notificações**

```typescript
import { NotificationService } from '@/services/notificationService';

// Verificar status
const status = await NotificationService.getDeviceStatus();

// Solicitar permissão
const hasPermission = await NotificationService.requestNotificationPermission();

// Configurar usuário
await NotificationService.setupUser('user-uuid', userData);

// Habilitar/desabilitar notificações
await NotificationService.setNotificationEnabled(true);
```

### 4. **Tela de Configurações**

Acesse a tela `NotificationSettings` para:
- Ver status das notificações
- Solicitar permissão
- Configurar tipos de notificação
- Atualizar status

## 🧪 Testando as Notificações

### **Teste Manual (Backend)**

Execute o script de teste:

```bash
cd backend
node test-notifications.js
```

### **Teste Programático**

```javascript
const { sendNotificationToAll } = require('./backend/test-notifications');

// Enviar para todos os usuários
await sendNotificationToAll(
  '🔔 Teste',
  'Notificação de teste funcionando!',
  { screen: 'Home' }
);
```

## 📱 Configurações por Plataforma

### **iOS**
- Permissão solicitada automaticamente
- Configurações em: `Configurações > App > Notificações`
- Som e badges configuráveis

### **Android**
- Permissão solicitada automaticamente
- Configurações em: `Configurações > Apps > App > Notificações`
- Canais de notificação configurados

## 🔧 Troubleshooting

### **Problema: Notificações não chegam**

1. **Verificar permissão:**
   ```typescript
   const hasPermission = await NotificationService.checkNotificationPermission();
   ```

2. **Verificar inscrição:**
   ```typescript
   const isSubscribed = await NotificationService.isNotificationEnabled();
   ```

3. **Verificar logs:**
   - Console do app para logs do OneSignal
   - OneSignal Dashboard para status do dispositivo

### **Problema: Usuário não recebe notificações**

1. **Verificar se o usuário está logado:**
   ```typescript
   await NotificationService.setupUser(userId, userData);
   ```

2. **Verificar tags do usuário:**
   ```typescript
   await NotificationService.addTag('user_type', 'premium');
   ```

3. **Testar com notificação direta:**
   ```javascript
   await sendNotificationToUser(userId, 'Teste', 'Mensagem de teste');
   ```

## 📊 Monitoramento

### **OneSignal Dashboard**
- Acesse: https://app.onesignal.com
- App ID: `0e4144a3-0a94-4281-80df-b6d9fba9a33c`
- Monitore: usuários ativos, entregas, cliques

### **Logs do App**
- Console do React Native
- Logs do OneSignal com `LogLevel.Verbose`

## 🎯 Próximos Passos

1. **Testar no dispositivo real** (não emulador)
2. **Verificar permissões** nas configurações do sistema
3. **Enviar notificação de teste** usando o script
4. **Monitorar logs** para identificar problemas
5. **Configurar tipos específicos** de notificação

## 📞 Suporte

Se as notificações ainda não funcionarem:

1. Verifique os logs do console
2. Teste com o script de backend
3. Verifique o OneSignal Dashboard
4. Confirme que o dispositivo tem internet
5. Teste em dispositivo real (não emulador)

---

**Status:** ✅ Configurado e pronto para uso  
**Última atualização:** $(date)  
**Versão:** 1.0.0 