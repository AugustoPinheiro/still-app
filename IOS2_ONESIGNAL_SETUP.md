# 🔔 Configuração OneSignal para iOS2

Este guia explica como configurar o OneSignal no diretório `ios2` do projeto.

## 📋 Status Atual

✅ **Dependências instaladas** - OneSignalXCFramework (5.2.10) e react-native-onesignal (5.2.9)  
✅ **AppDelegate configurado** - Remote notification delegates  
✅ **UIBackgroundModes** - Adicionado no Info.plist  
✅ **Podfile atualizado** - Target da extension adicionado  
❌ **Notification Service Extension** - Precisa ser criada no Xcode  

## 🚀 Próximos Passos no Xcode

### **1. Abrir o Projeto no Xcode**

```bash
cd ios2
open still.xcworkspace
```

### **2. Criar Notification Service Extension**

1. **File > New > Target**
2. **iOS > Notification Service Extension**
3. **Nome**: `OneSignalNotificationServiceExtension`
4. **Bundle Identifier**: `br.com.stillapp.OneSignalNotificationServiceExtension`
5. **Language**: Objective-C

### **3. Configurar o Target**

1. **Selecionar o target** `OneSignalNotificationServiceExtension`
2. **General tab**:
   - **Display Name**: `OneSignalNotificationServiceExtension`
   - **Bundle Identifier**: `br.com.stillapp.OneSignalNotificationServiceExtension`
   - **Version**: `2.1.0`
   - **Build**: `1`

### **4. Configurar Entitlements**

1. **Signing & Capabilities**
2. **Add Capability**: `App Groups`
3. **Group**: `group.br.com.stillapp`

### **5. Substituir Arquivos**

Substitua os arquivos criados pelos que já criamos:

- `NotificationService.h` → Substituir pelo nosso
- `NotificationService.m` → Substituir pelo nosso
- `Info.plist` → Substituir pelo nosso
- `Entitlements` → Substituir pelo nosso

### **6. Configurar Build Settings**

1. **Selecionar target** `OneSignalNotificationServiceExtension`
2. **Build Settings**:
   - **iOS Deployment Target**: `15.1` (mesmo do app principal)
   - **Swift Language Version**: `Swift 5` (se necessário)

### **7. Configurar Dependências**

1. **Selecionar target** `OneSignalNotificationServiceExtension`
2. **General > Frameworks, Libraries, and Embedded Content**
3. **Adicionar**: `OneSignalXCFramework.framework`

## 🔧 Configurações Adicionais

### **App Groups**

Certifique-se de que ambos os targets (app principal e extension) tenham o mesmo App Group:
- `group.br.com.stillapp`

### **Bundle Identifiers**

- **App Principal**: `br.com.stillapp`
- **Extension**: `br.com.stillapp.OneSignalNotificationServiceExtension`

### **Versões**

Mantenha as versões sincronizadas:
- **App Principal**: `2.1.0` (1)
- **Extension**: `2.1.0` (1)

## 🧪 Testando

### **1. Build e Run**

```bash
cd ios2
pod install
npx expo run:ios
```

### **2. Verificar Logs**

- Console do Xcode
- Console do React Native
- OneSignal Dashboard

### **3. Testar Notificação**

Use o script de teste:
```bash
cd backend
node test-notifications.js
```

## ⚠️ Problemas Comuns

### **Erro de Build**

1. **Limpar projeto**: `Product > Clean Build Folder`
2. **Reinstalar pods**: `pod deintegrate && pod install`
3. **Verificar versões**: iOS Deployment Target igual em ambos targets

### **Extension não aparece**

1. **Verificar Bundle ID** da extension
2. **Verificar App Groups** em ambos targets
3. **Verificar Info.plist** da extension

### **Notificações não chegam**

1. **Verificar permissões** no dispositivo
2. **Verificar logs** do OneSignal
3. **Testar em dispositivo real** (não emulador)

## 📱 Configuração Final

Após configurar no Xcode:

1. **Build e testar** no dispositivo real
2. **Verificar permissões** nas configurações do iOS
3. **Enviar notificação de teste**
4. **Monitorar logs** para confirmar funcionamento

---

**Status**: ⚠️ Configuração parcial - precisa finalizar no Xcode  
**Próximo passo**: Abrir projeto no Xcode e criar a extension  
**Versão**: 2.1.0 