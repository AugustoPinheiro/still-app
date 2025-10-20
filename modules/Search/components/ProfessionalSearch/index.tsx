import React, { useCallback, useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/Loading';
import { Search } from '@/components/Search';
import { ImageViewer } from '@/components/ImageViewer';
import { useSearch } from '@/modules/Search/contexts/search.contexts';
import { getSocialPostsByUsername } from '@/modules/Social/services/anotherpersonprofile.services';

import { SearchStackParamList } from '../../routes/search.types';
import * as S from './styles';
import { SocialProfileType } from '@/types/SocialProfileType';
import MasonryList from '@react-native-seoul/masonry-list';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Componente separado para cada item da lista
const StylistItem = React.memo(({ item, onNavigate }: { item: any; onNavigate: (user: SocialProfileType) => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const { data: userPosts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['userPosts', item?.username],
    queryFn: async () => {
      if (!item?.username) return null;
      const response = await getSocialPostsByUsername(item.username);
      return response?.result || [];
    },
    enabled: !!item?.username,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Pegar os posts que têm imagens
  const postsWithImages = userPosts?.filter(post => post?.media?.[0]?.image_url) || [];
  const firstPost = postsWithImages[0];
  const secondPost = postsWithImages[1];

  const handleImagePress = (imageUri: string) => {
    setSelectedImage(imageUri);
    setImageViewerVisible(true);
  };

  const handleCloseImageViewer = () => {
    setImageViewerVisible(false);
    setSelectedImage(null);
  };

  return (
    <S.StylistSection>
      {/* Card do perfil da personal stylist */}
      <S.StylistProfileCard>
        <S.StylistProfileImage 
          onPress={() => item?.professional_profile.avatar && handleImagePress(item.professional_profile.avatar)}
        >
          <S.StylistProfileImageContent 
            source={{ uri: item?.professional_profile.avatar }} 
            cachePolicy="disk" 
          />
        </S.StylistProfileImage>
        <S.StylistInfo>
          <S.StylistName>{item?.professional_profile.name || item?.username}</S.StylistName>
        </S.StylistInfo>
        <S.StylistActionButton onPress={() => item && onNavigate(item)}>
          <S.StylistActionText>conhecer</S.StylistActionText>
        </S.StylistActionButton>
      </S.StylistProfileCard>

      {/* Posts da personal stylist - sór mostra se tiver posts com imagens */}
      {!isLoadingPosts && postsWithImages.length > 0 && (
        <S.StylistPostsContainer>
          {firstPost?.media?.[0]?.image_url && (
            <S.StylistPostImage 
              onPress={() => handleImagePress(firstPost.media[0].image_url)}
            >
              <S.StylistPostImageContent 
                source={{ uri: firstPost.media[0].image_url }} 
                cachePolicy="disk" 
              />
            </S.StylistPostImage>
          )}
          
          {secondPost?.media?.[0]?.image_url && (
            <S.StylistPostImage 
              onPress={() => handleImagePress(secondPost.media[0].image_url)}
            >
              <S.StylistPostImageContent 
                source={{ uri: secondPost.media[0].image_url }} 
                cachePolicy="disk" 
              />
            </S.StylistPostImage>
          )}
        </S.StylistPostsContainer>
      )}

      {/* Estado de carregamento */}
      {isLoadingPosts && (
        <S.StylistPostsContainer>
          <S.StylistPostPlaceholder>
            <S.PostPlaceholderText>Carregando...</S.PostPlaceholderText>
          </S.StylistPostPlaceholder>
          <S.StylistPostPlaceholder>
            <S.PostPlaceholderText>Carregando...</S.PostPlaceholderText>
          </S.StylistPostPlaceholder>
        </S.StylistPostsContainer>
      )}

      {/* ImageViewer */}
      <ImageViewer
        visible={imageViewerVisible}
        imageUri={selectedImage || ''}
        onClose={handleCloseImageViewer}
      />
    </S.StylistSection>
  );
});

export function PersonalStylistSearch() {
  const navigation = useNavigation<NavigationProp<SearchStackParamList>>();
  const {
    isLoadingPersonalStylist,
    usersPersonalStylist,
    searchPersonalStylist,
    setSearchPersonalStylist,
    hasNextPagePersonalStylist,
    fetchNextPagePersonalStylist,
    isFetchingPersonalStylist,
    filterStylist,
    setFilterStylist,
    refetchPersonalStylist
  } = useSearch();

  // Refazer a busca quando o filtro mudar
  useEffect(() => {
    // Forçar refetch quando o filtro mudar
    const timeoutId = setTimeout(() => {
      refetchPersonalStylist();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [filterStylist, refetchPersonalStylist]);

  function handleNavigateUser(user: SocialProfileType) {
    // @ts-expect-error
    navigation.navigate('Feed', {
      screen: 'AnotherUserProfile',
      params: {
        username: user.username,
        id: user.id,
        from: 'searchProfessionals',
      },
    });
  }

  const handleFilterChange = useCallback((newFilter: string) => {
    console.log('Filtro atual:', filterStylist, 'Novo filtro:', newFilter);
    const finalFilter = filterStylist === newFilter ? '' : newFilter;
    console.log('Filtro final:', finalFilter);
    setFilterStylist(finalFilter);
  }, [filterStylist, setFilterStylist]);

  const renderStylistSection = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <StylistItem 
        key={`stylist_${item?.id}_${index}`}
        item={item} 
        onNavigate={handleNavigateUser} 
      />
    );
  }, [handleNavigateUser]);

  const renderItem = useCallback(({ item, i }: { item: any; i: any }) => {
    return (
      <S.Column hasMarginBottom onPress={() => item && handleNavigateUser(item)}>
        <S.UserPhoto source={{ uri: item?.professional_profile.avatar }} cachePolicy="disk" />
        <S.LabelTitle>@{item?.username}</S.LabelTitle>
        <S.Label>
          Consultoria de imagem
        </S.Label>
      </S.Column>
    );
  }, [handleNavigateUser]);

  const renderProfileCard = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <S.ProfileCard key={`${item?.id}_${index}`}>
        <S.CardContent>
          <S.ImageContainer>
            <S.ProfileImage 
              source={{ uri: item?.professional_profile.avatar }} 
              cachePolicy="disk" 
            />
            {item?.verified && (
              <S.VerifiedBadge>
                <MaterialCommunityIcons name="check" size={10} color="#FFF" />
              </S.VerifiedBadge>
            )}
          </S.ImageContainer>
          <S.ProfileName>{item?.professional_profile.name || item?.username}</S.ProfileName>
          <S.ProfileUsername>@{item?.username}</S.ProfileUsername>
          <S.ProfileBio>
            Consultoria de imagem
          </S.ProfileBio>
          <S.ActionButton onPress={() => item && handleNavigateUser(item)}>
            <S.ActionButtonText>Perfil</S.ActionButtonText>
          </S.ActionButton>
        </S.CardContent>
      </S.ProfileCard>
    );
  }, [handleNavigateUser]);

  return (
    <S.Container>
      {isLoadingPersonalStylist ? (
        <Loading />
      ) : (
        <>
          <S.Content>
            <S.Line>
              <S.ContentInput>
                <Search
                  placeholder="Busque por uma consultora"
                  onChangeText={(value) => setSearchPersonalStylist(value)}
                  value={searchPersonalStylist}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  width="100%"
                />
              </S.ContentInput>
            </S.Line>
            
            <S.FilterContainer>
              <S.FilterButton 
                isActive={filterStylist === 'presencial'}
                onPress={() => handleFilterChange('presencial')}>
                <S.FilterLabel isActive={filterStylist === 'presencial'}>Presencial</S.FilterLabel>
                <S.FilterUnderline isActive={filterStylist === 'presencial'} />
              </S.FilterButton>
              <S.FilterButton 
                isActive={filterStylist === 'online'}
                onPress={() => handleFilterChange('online')}>
                <S.FilterLabel isActive={filterStylist === 'online'}>Online</S.FilterLabel>
                <S.FilterUnderline isActive={filterStylist === 'online'} />
              </S.FilterButton>
              <S.FilterButton 
                isActive={filterStylist === 'both'}
                onPress={() => handleFilterChange('both')}>
                <S.FilterLabel isActive={filterStylist === 'both'}>Ambos</S.FilterLabel>
                <S.FilterUnderline isActive={filterStylist === 'both'} />
              </S.FilterButton>
            </S.FilterContainer>
          </S.Content>

          {/* Lista de personal stylists com perfil + posts */}
          {usersPersonalStylist && usersPersonalStylist.length > 0 && (
            <FlatList
              data={usersPersonalStylist}
              keyExtractor={(item, index) => `stylist_${item?.id}_${index}`}
              renderItem={renderStylistSection}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              ListFooterComponent={
                isFetchingPersonalStylist ? <Loading hasBackground={false} /> : null
              }
              onEndReached={() => {
                if (isFetchingPersonalStylist || !hasNextPagePersonalStylist) return;
                fetchNextPagePersonalStylist();
              }}
              onEndReachedThreshold={0.1}
            />
          )}

          {/* Estado vazio */}
          {(!usersPersonalStylist || usersPersonalStylist.length === 0) && !isLoadingPersonalStylist && (
            <S.Empty>
              <S.LabelTitle>Nenhuma consultora encontrada.</S.LabelTitle>
            </S.Empty>
          )}
        </>
      )}
    </S.Container>
  );
}
