import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import ClosetNewsBanner from '@/assets/images/closetNewsBanner.png';

import * as S from './styles';

export function NewSuggestionsCard() {
  const navigation = useNavigation<any>();

  function handleGoToAllSuggestions() {
    navigation.navigate('AllSuggestions', { from: 'Closet' });
  }

  return (
    <S.Container>
      <S.backgroundImage source={ClosetNewsBanner} contentFit="cover" />
      <S.Content onPress={handleGoToAllSuggestions}>
        <S.ClircleSpan>
          <S.ClircleSpanContent />
        </S.ClircleSpan>
        <S.Title>Novas sugestões</S.Title>
        <S.Row>
          <S.Description>Veja quem está te sugerindo novos looks</S.Description>
          <MaterialCommunityIcons name="arrow-right" color="#fff" size={20} />
        </S.Row>
      </S.Content>
    </S.Container>
  );
}
