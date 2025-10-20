import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Tag } from '@/components/Tag';
import { EProfile, useDiscovery } from '@/modules/Discovery/contexts/discovery.contexts';

import { type DiscoveryStackParamList } from '../../routes/discovery.types';
import * as S from './styles';

type TObjectiveNavigationProps = NativeStackNavigationProp<
  DiscoveryStackParamList,
  'ChooseProfile'
>;

export function ChooseProfile() {
  const { setProfile, profile } = useDiscovery();
  const route = useRoute();
  const params = route.params as { isCreateProfile: boolean };
  const isCreateProfile = params?.isCreateProfile;
  const navigation = useNavigation<TObjectiveNavigationProps>();

  function handleGoToNext(profile: EProfile) {
    setProfile(profile);

    navigation.navigate('Objective', { isCreateProfile });
  }

  return (
    <S.Container hasHeader={false}>
      <S.Title>{'Qual tipo de conta\nvocê deseja criar?'}</S.Title>
      <S.Subtitle>Selecione abaixo qual perfil é o seu</S.Subtitle>

      <S.TagContainer>
        <Tag
          title="Quero ter uma conta pessoal"
          onPress={() => handleGoToNext(EProfile.PERSONAL)}
          selected={profile === EProfile.PERSONAL}
        />
        <Tag
          title="Quero me cadastrar como personal stylist"
          onPress={() => handleGoToNext(EProfile.PERSONAL_STYLIST)}
          selected={profile === EProfile.PERSONAL_STYLIST}
        />
        <Tag
          title="Quero cadastrar minha loja"
          onPress={() => handleGoToNext(EProfile.STORE)}
          selected={profile === EProfile.STORE}
        />
      </S.TagContainer>
    </S.Container>
  );
}
