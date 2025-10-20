import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert, ScrollView } from 'react-native';

import { NotificationService } from '@/services/notificationService';
import { NotificationPermission } from '@/components/NotificationPermission';
import { Button } from '@/components/Button';

import * as S from './styles';

export function NotificationSettings() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceStatus, setDeviceStatus] = useState<any>(null);

  // Estados para diferentes tipos de notificação
  const [newPostsEnabled, setNewPostsEnabled] = useState(true);
  const [messagesEnabled, setMessagesEnabled] = useState(true);
  const [followersEnabled, setFollowersEnabled] = useState(true);
  const [likesEnabled, setLikesEnabled] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  useEffect(() => {
    loadNotificationStatus();
  }, []);

  const loadNotificationStatus = async () => {
    try {
      setIsLoading(true);
      
      const status = await NotificationService.getDeviceStatus();
      setDeviceStatus(status);
      
      if (status) {
        setHasPermission(status.hasPermission);
        setIsSubscribed(status.isSubscribed);
      }
    } catch (error) {
      console.error('Erro ao carregar status das notificações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionGranted = async () => {
    setHasPermission(true);
    await loadNotificationStatus();
    
    Alert.alert(
      '✅ Notificações Ativadas',
      'Agora você receberá notificações sobre novos posts, mensagens e interações!'
    );
  };

  const handlePermissionDenied = () => {
    Alert.alert(
      '❌ Permissão Negada',
      'Para receber notificações, você precisa habilitar as notificações nas configurações do app.'
    );
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    try {
      await NotificationService.setNotificationEnabled(enabled);
      setIsSubscribed(enabled);
      
      if (enabled) {
        Alert.alert('✅ Notificações Habilitadas', 'Você receberá notificações push.');
      } else {
        Alert.alert('🔕 Notificações Desabilitadas', 'Você não receberá mais notificações push.');
      }
    } catch (error) {
      console.error('Erro ao alterar status das notificações:', error);
      Alert.alert('Erro', 'Não foi possível alterar o status das notificações.');
    }
  };

  const handleToggleNotificationType = async (type: string, enabled: boolean) => {
    try {
      await NotificationService.addTag(`${type}_notifications`, enabled ? 'enabled' : 'disabled');
      
      switch (type) {
        case 'new_posts':
          setNewPostsEnabled(enabled);
          break;
        case 'messages':
          setMessagesEnabled(enabled);
          break;
        case 'followers':
          setFollowersEnabled(enabled);
          break;
        case 'likes':
          setLikesEnabled(enabled);
          break;
        case 'comments':
          setCommentsEnabled(enabled);
          break;
      }
    } catch (error) {
      console.error(`Erro ao alterar notificação ${type}:`, error);
    }
  };

  const refreshStatus = async () => {
    await loadNotificationStatus();
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingText>Carregando configurações...</S.LoadingText>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Section>
          <S.SectionTitle>Status das Notificações</S.SectionTitle>
          
          <S.StatusCard>
            <S.StatusRow>
              <S.StatusLabel>Permissão do Sistema</S.StatusLabel>
              <S.StatusValue hasPermission={hasPermission}>
                {hasPermission ? '✅ Concedida' : '❌ Negada'}
              </S.StatusValue>
            </S.StatusRow>
            
            <S.StatusRow>
              <S.StatusLabel>Inscrição OneSignal</S.StatusLabel>
              <S.StatusValue hasPermission={isSubscribed}>
                {isSubscribed ? '✅ Ativa' : '❌ Inativa'}
              </S.StatusValue>
            </S.StatusRow>
            
            {deviceStatus?.pushSubscriptionId && (
              <S.StatusRow>
                <S.StatusLabel>Device ID</S.StatusLabel>
                <S.StatusValue hasPermission={true}>
                  {deviceStatus.pushSubscriptionId.substring(0, 8)}...
                </S.StatusValue>
              </S.StatusRow>
            )}
          </S.StatusCard>
        </S.Section>

        {!hasPermission && (
          <S.Section>
            <S.SectionTitle>Ativar Notificações</S.SectionTitle>
            <S.Description>
              Para receber notificações sobre novos posts, mensagens e interações, 
              você precisa permitir as notificações push.
            </S.Description>
            
            <NotificationPermission
              onPermissionGranted={handlePermissionGranted}
              onPermissionDenied={handlePermissionDenied}
            />
          </S.Section>
        )}

        {hasPermission && (
          <>
            <S.Section>
              <S.SectionTitle>Notificações Push</S.SectionTitle>
              <S.Description>
                Controle se você quer receber notificações push no seu dispositivo.
              </S.Description>
              
              <S.SwitchRow>
                <S.SwitchLabel>Receber Notificações Push</S.SwitchLabel>
                <Switch
                  value={isSubscribed}
                  onValueChange={handleToggleNotifications}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isSubscribed ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Tipos de Notificação</S.SectionTitle>
              <S.Description>
                Escolha quais tipos de notificação você quer receber.
              </S.Description>
              
              <S.SwitchRow>
                <S.SwitchLabel>Novos Posts</S.SwitchLabel>
                <Switch
                  value={newPostsEnabled}
                  onValueChange={(enabled) => handleToggleNotificationType('new_posts', enabled)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={newPostsEnabled ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
              
              <S.SwitchRow>
                <S.SwitchLabel>Mensagens</S.SwitchLabel>
                <Switch
                  value={messagesEnabled}
                  onValueChange={(enabled) => handleToggleNotificationType('messages', enabled)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={messagesEnabled ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
              
              <S.SwitchRow>
                <S.SwitchLabel>Novos Seguidores</S.SwitchLabel>
                <Switch
                  value={followersEnabled}
                  onValueChange={(enabled) => handleToggleNotificationType('followers', enabled)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={followersEnabled ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
              
              <S.SwitchRow>
                <S.SwitchLabel>Curtidas</S.SwitchLabel>
                <Switch
                  value={likesEnabled}
                  onValueChange={(enabled) => handleToggleNotificationType('likes', enabled)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={likesEnabled ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
              
              <S.SwitchRow>
                <S.SwitchLabel>Comentários</S.SwitchLabel>
                <Switch
                  value={commentsEnabled}
                  onValueChange={(enabled) => handleToggleNotificationType('comments', enabled)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={commentsEnabled ? '#f5dd4b' : '#f4f3f4'}
                />
              </S.SwitchRow>
            </S.Section>
          </>
        )}

        <S.Section>
          <S.SectionTitle>Atualizar Status</S.SectionTitle>
          <Button
            title="🔄 Atualizar Status"
            onPress={refreshStatus}
            variant="outline"
          />
        </S.Section>
      </ScrollView>
    </S.Container>
  );
} 