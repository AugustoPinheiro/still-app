# Configuração do OneSignal

Este guia explica como configurar o OneSignal no projeto React Native.

## 📋 Informações do Projeto

- **App ID**: `0e4144a3-0a94-4281-80df-b6d9fba9a33c`
- **REST API Key**: `alpn2fdzceauf7tpmn5g6spr6`
- **Legacy API Key**: `cvwrffoeaepq5xqlzf33xm6ky`
- **Key ID**: `jrundwt65ewouxf46d34mi3di`

## 🚀 Configuração Atual

✅ **App ID configurado** no `app.json`  
✅ **Plugin OneSignal** adicionado  
✅ **Inicialização automática** no App.tsx  
✅ **Handlers de notificação** configurados  
✅ **Hook personalizado** criado  

## 🔧 Como Usar

### 1. Login/Logout de Usuários

```typescript
import { loginOneSignalUser, logoutOneSignalUser } from '@/config/oneSignal';

// Login do usuário
loginOneSignalUser('user-uuid');

// Logout do usuário
logoutOneSignalUser();
```

### 2. Adicionar Tags

```typescript
import { addOneSignalTag, removeOneSignalTag } from '@/config/oneSignal';

// Adicionar tag
addOneSignalTag('user_type', 'premium');
addOneSignalTag('location', 'sao-paulo');

// Remover tag
removeOneSignalTag('user_type');
```

### 3. Usar o Hook

```typescript
import { useOneSignal } from '@/hooks/useOneSignal';

function MyComponent() {
  const { 
    isInitialized, 
    hasPermission, 
    loginUser, 
    logoutUser,
    requestPermission 
  } = useOneSignal();

  return (
    <View>
      <Text>OneSignal: {isInitialized ? 'Ativo' : 'Inativo'}</Text>
      <Text>Permissão: {hasPermission ? 'Concedida' : 'Negada'}</Text>
    </View>
  );
}
```

## 📱 Envio de Notificações (Backend)

### Enviar para usuários específicos:

```javascript
const { sendPushNotification } = require('./backend/oneSignal-example');

sendPushNotification(
  ['user-uuid-1', 'user-uuid-2'], 
  'Novo evento!', 
  'Você tem um novo evento agendado',
  { screen: 'EventDetails', eventId: '123' }
);
```

### Enviar para todos os usuários:

```javascript
const { sendNotificationToAll } = require('./backend/oneSignal-example');

sendNotificationToAll(
  'Manutenção', 
  'O app estará em manutenção hoje às 22h',
  { screen: 'Maintenance' }
);
```

### Enviar por tags:

```javascript
const { sendNotificationByTags } = require('./backend/oneSignal-example');

// Enviar apenas para usuários premium em São Paulo
sendNotificationByTags(
  { user_type: 'premium', location: 'sao-paulo' },
  'Evento VIP', 
  'Evento exclusivo para usuários premium',
  { screen: 'VIPEvent' }
);
```

## 🧪 Testando

### 1. Teste Local

```bash
# Executar o app
npx expo start

# Verificar logs do OneSignal no console
```

### 2. Teste de Notificação

1. Acesse o [OneSignal Dashboard](https://app.onesignal.com)
2. Selecione seu app
3. Vá em **Messages > New Push**
4. Configure a mensagem
5. Selecione **Send to Subscribed Users**
6. Envie a notificação

### 3. Verificar Status

```typescript
import { useOneSignal } from '@/hooks/useOneSignal';

const { isInitialized, hasPermission } = useOneSignal();
console.log('OneSignal Status:', { isInitialized, hasPermission });
```

## 🔍 Troubleshooting

### Problema: "OneSignal App ID não encontrado"

**Solução:**
- ✅ App ID já configurado: `0e4144a3-0a94-4281-80df-b6d9fba9a33c`
- Verifique se o app foi reiniciado após a configuração

### Problema: Notificações não chegam

**Solução:**
1. Verifique se as permissões foram concedidas
2. Verifique se o usuário está logado no OneSignal
3. Verifique os logs no console
4. Teste em dispositivo físico (não simulador)

### Problema: Erro de build

**Solução:**
```bash
# Limpar cache
npx expo start --clear

# Reinstalar dependências
npm install

# Verificar se o plugin está instalado
npx expo install onesignal-expo-plugin
```

## 📚 Recursos

- [OneSignal Dashboard](https://app.onesignal.com)
- [Documentação Oficial](https://documentation.onesignal.com/)
- [Exemplo de Backend](./backend/oneSignal-example.js)

## ⚠️ Segurança

**IMPORTANTE**: As API Keys devem ser usadas APENAS no backend:
- ❌ NUNCA exponha no código do app
- ❌ NUNCA compartilhe no GitHub
- ✅ Use apenas no servidor/backend
- ✅ Mantenha em variáveis de ambiente seguras

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs no console
2. Teste em dispositivo físico
3. Verifique se todas as configurações estão corretas
4. Consulte a documentação oficial 