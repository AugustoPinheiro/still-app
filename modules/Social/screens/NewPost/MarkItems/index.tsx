import React, { useEffect } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '@/components/Button';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';
import { MarkClothes } from '@/modules/Social/components/MarkClothes';
import { MarkPicture } from '@/modules/Social/components/MarkPicture';
import { MarkPictureClothesRow } from '@/modules/Social/components/MarkPictureClothesRow';
import { MarkPictureRow } from '@/modules/Social/components/MarkPictureRow';
import {
  ISelectUserOrStore,
  useNewPost,
} from '@/modules/Social/screens/NewPost/contexts/newPost.contexts';
import { ClosetClothingType } from '@/types/ClosetClothingType';

import { SocialStackParamList } from '../../../routes/social.types';
import * as S from './styles';

export function MarkItems() {
  const { expand, setBottomSheetProps, close } = useBottomSheet();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<SocialStackParamList, 'NewPostMarkItems'>>();
  const { selectedPeople, setSelectedPeople, selectedClothes, setSelectedClothes } = useNewPost();

  const getDescription = () => {
    switch (route.params.type) {
      case 'clothing':
        return {
          description: 'roupas',
          title: 'MARCAR ROUPA',
          selecteds: 'Peças',
          action: (pos: { x: number; y: number }) => {
            setBottomSheetProps({
              id: 'CommentsPost',
              content: <MarkClothes setSelectedClothes={setSelectedClothes} pos={pos} />,
              snapPoints: ['100%'],
            });
            expand();
          },
        };
      case 'store':
        return {
          description: 'lojas',
          title: 'MARCAR LOJA',
          selecteds: 'Lojas',
          action: (pos: { x: number; y: number }) => {
            setBottomSheetProps({
              id: 'CommentsPost',
              content: (
                <MarkPicture
                  title="MARCAR LOJA"
                  searchText="Pesquisar por uma loja"
                  setSelected={setSelectedPeople}
                  pos={pos}
                  type="store"
                />
              ),
              snapPoints: ['100%'],
            });
            expand();
          },
        };
      case 'professional':
        return {
          description: 'um personal',
          title: 'MARCAR PERSONAL',
          selecteds: 'Personal',
          action: (pos: { x: number; y: number }) => {
            setBottomSheetProps({
              id: 'CommentsPost',
              content: (
                <MarkPicture
                  title="MARCAR PERSONAL"
                  searchText="Pesquisar por um personal"
                  setSelected={setSelectedPeople}
                  pos={pos}
                  type="professional"
                />
              ),
              snapPoints: ['100%'],
            });
            expand();
          },
        };
      case 'common':
      default:
        return {
          description: 'pessoas',
          title: 'MARCAR PESSOA',
          selecteds: 'Pessoas',
          action: (pos: { x: number; y: number }) => {
            setBottomSheetProps({
              id: 'CommentsPost',
              content: (
                <MarkPicture
                  title="MARCAR PESSOA"
                  searchText="Pesquisar por uma pessoa"
                  setSelected={setSelectedPeople}
                  pos={pos}
                  type="common"
                />
              ),
              snapPoints: ['100%'],
            });
            expand();
          },
        };
    }
  };

  const handlePress = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    const relativeX = locationX / S.widthImage;
    const relativeY = locationY / S.widthImage;

    getDescription().action({ x: relativeX, y: relativeY });
  };

  function toggleSelectedItem(item: ISelectUserOrStore) {
    if (selectedPeople?.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedPeople((prevSelecteds) =>
        prevSelecteds?.filter((selectedItem) => selectedItem.id !== item.id)
      );
      return;
    }

    setSelectedPeople((prevSelecteds) => {
      return [...prevSelecteds.filter((selectedItem) => selectedItem.id !== item.id), item];
    });
  }

  function toggleSelectedItemClothes(item: ClosetClothingType) {
    if (selectedClothes?.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedClothes((prevSelecteds) =>
        prevSelecteds?.filter((selectedItem) => selectedItem.id !== item.id)
      );
      return;
    }

    // @ts-expect-error
    setSelectedClothes((prevSelecteds) => [
      ...(prevSelecteds?.filter((selectedItem) => selectedItem.id !== item.id) ?? []),
      item,
    ]);
  }

  function renderMarkers() {
    const filteredPeople = selectedPeople?.filter((item) => item.type === route.params.type);

    if (!filteredPeople?.length && !(route.params.type === 'clothing')) {
      return <></>;
    }

    if (route.params.type === 'clothing') {
      if (!selectedClothes?.length) {
        return <></>;
      }

      return selectedClothes?.map((item) => {
        const isSmaller = item.pos.x < 0.22;
        const posX = item.pos.x > 0.81 ? 0.81 : isSmaller ? 0.05 : item.pos.x;

        return (
          <S.Marker
            key={item.id}
            style={{
              left: `${isSmaller ? posX * 100 : posX * 100 - item.title?.length}%`,
              top: `${item.pos.y * 100}%`,
            }}
          >
            <S.MarkerText>{item.title?.slice(0, 15)}</S.MarkerText>
          </S.Marker>
        );
      });
    }

    return filteredPeople?.map((item) => {
      const isSmaller = item.pos.x < 0.22;
      const posX = item.pos.x > 0.81 ? 0.81 : isSmaller ? 0.05 : item.pos.x;

      return (
        <S.Marker
          key={item.id}
          style={{
            left: `${isSmaller ? posX * 100 : posX * 100 - item.username?.length}%`,
            top: `${item.pos.y * 100}%`,
          }}
        >
          <S.MarkerText>{item.username?.slice(0, 15)}</S.MarkerText>
        </S.Marker>
      );
    });
  }

  function renderSelected() {
    const filteredPeople = selectedPeople?.filter((item) => item.type === route.params.type);

    if (!filteredPeople?.length && !(route.params.type === 'clothing')) {
      return <S.TextSmall>Toque na foto para marcar {getDescription().description}</S.TextSmall>;
    }

    if (route.params.type === 'clothing') {
      if (!selectedClothes?.length) {
        return <S.TextSmall>Toque na foto para marcar {getDescription().description}</S.TextSmall>;
      }

      return (
        <S.ContainerList>
          <View>
            <S.Label>{getDescription().selecteds}</S.Label>
            {selectedClothes?.map((item) => (
              <MarkPictureClothesRow
                key={item.id}
                item={item}
                toggleSelectedItem={toggleSelectedItemClothes}
              />
            ))}
          </View>
          <Button
            title="Concluir"
            onPress={() => {
              close();
              navigation.goBack();
            }}
          />
        </S.ContainerList>
      );
    }

    return (
      <S.ContainerList>
        <View>
          <S.Label>{getDescription().selecteds}</S.Label>
          {filteredPeople.map((item) => (
            <MarkPictureRow
              key={item.id}
              user={item}
              lastItem
              toggleSelectedItem={toggleSelectedItem}
              hasRemove
              type={item?.type}
            />
          ))}
        </View>
        <Button
          title="Concluir"
          onPress={() => {
            close();
            navigation.goBack();
          }}
        />
      </S.ContainerList>
    );
  }

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return (
    <S.Container>
      <S.Content>
        <TouchableOpacity onPress={handlePress}>
          <S.ImageContent
            key={route.params?.uri}
            source={{ uri: route.params?.uri }}
            contentFit="cover"
            contentPosition="center"
            recyclingKey={route.params?.uri}
            priority="high"
            cachePolicy="disk"
          />

          {renderMarkers()}
        </TouchableOpacity>
        {renderSelected()}
      </S.Content>
    </S.Container>
  );
}
