import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import { Button } from '@/components/Button';
import { useOneSignal } from '@/hooks/useOneSignal';

interface NotificationPermissionProps {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
}

export function NotificationPermission({ 
  onPermissionGranted, 
  onPermissionDenied 
}: NotificationPermissionProps) {
  const { hasPermission, requestPermission } = useOneSignal();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    
    try {
      if (Platform.OS === 'ios') {
        // No iOS, mostrar alerta explicativo primeiro
        Alert.alert(
          'Notificações Push',
          'Para receber notificações sobre novos posts, mensagens e atualizações, precisamos da sua permissão.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => {
                setIsRequesting(false);
                onPermissionDenied?.();
              }
            },
            {
              text: 'Permitir',
              onPress: async () => {
                const permission = await requestPermission();
                setIsRequesting(false);
                
                if (permission) {
                  onPermissionGranted?.();
                } else {
                  onPermissionDenied?.();
                }
              }
            }
          ]
        );
      } else {
        // No Android, solicitar diretamente
        const permission = await requestPermission();
        setIsRequesting(false);
        
        if (permission) {
          onPermissionGranted?.();
        } else {
          onPermissionDenied?.();
        }
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      setIsRequesting(false);
      onPermissionDenied?.();
    }
  };

  const openSettings = () => {
    Alert.alert(
      'Permissão Negada',
      'Para receber notificações, você precisa habilitar as notificações nas configurações do app.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Abrir Configurações',
          onPress: () => {
            // Abrir configurações do app
            if (Platform.OS === 'ios') {
              // No iOS, abrir configurações do app
              OneSignal.Notifications.requestPermission(true);
            } else {
              // No Android, abrir configurações do app
              OneSignal.Notifications.requestPermission(true);
            }
          }
        }
      ]
    );
  };

  if (hasPermission) {
    return (
      <Button
        title="✅ Notificações Ativas"
        onPress={() => {}}
        disabled
        variant="secondary"
      />
    );
  }

  return (
    <>
      <Button
        title={isRequesting ? "Solicitando..." : "🔔 Ativar Notificações"}
        onPress={handleRequestPermission}
        disabled={isRequesting}
        variant="primary"
      />
      
      {!hasPermission && (
        <Button
          title="⚙️ Abrir Configurações"
          onPress={openSettings}
          variant="outline"
          style={{ marginTop: 8 }}
        />
      )}
    </>
  );
} 