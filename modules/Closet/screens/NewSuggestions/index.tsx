import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useTheme } from 'styled-components/native';

import { Draggable } from '@/components/Draggable';
import { BottomSheetContent } from '@/modules/Closet/screens/NewSuggestions/components/BottomSheetContent';
import { SidebarFloat } from '@/modules/Closet/screens/NewSuggestions/components/SidebarFloat';
import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

type SelectedItem = ClosetClothingType & {
  index: number;
};

type NewSuggestionParams = {
  origin: {
    items: ClosetClothingType[];
  };
};

export function NewSuggestions({ navigation }: { navigation: NavigationProp<any> }) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const viewContainerRef = useRef<View>(null);
  const { params } = useRoute<RouteProp<NewSuggestionParams, 'origin'>>();
  const items = params?.items ?? [];

  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, [navigation]);

  const [firstLoad, setFirstLoad] = React.useState(true);
  const [isSheetExpanded, setIsSheetExpanded] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<SelectedItem[]>(items as any);
  const [selectedItem, setSelectedItem] = React.useState<SelectedItem | null>(null);
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const theme = useTheme();

  const iconName = isSheetExpanded ? 'chevron-down' : 'chevron-up';

  // variables
  const snapPoints = useMemo(() => [82, '60%'], []);

  function getContentSize(nativeEvent: any) {
    if (!nativeEvent) return;

    const { width, height } = nativeEvent.layout;
    setContainerSize({ width, height });
  }

  function handleExpandSheet() {
    bottomSheetRef.current?.expand();
    setSelectedItem(null);
  }

  function handleCollapseSheet() {
    setSelectedItem(null);
    bottomSheetRef.current?.collapse();
  }

  function onItemSelect(item: ClosetClothingType) {
    // handleCollapseSheet();
    setSelectedItems((prevState) => {
      const lastItem = prevState?.at(-1);
      const index = lastItem?.index !== undefined ? lastItem?.index + 1 : 0;

      return [...prevState, { ...(item as any), index }];
    });
  }

  function sendToback() {
    if (!selectedItem) return;

    const index = selectedItems.findIndex(
      (item) => item.id === selectedItem?.id && item.index === selectedItem?.index
    );
    const newArray = [...selectedItems];
    newArray.splice(index, 1);
    newArray.unshift(selectedItem);
    setSelectedItems(newArray);
  }

  function sendToFront() {
    if (!selectedItem) return;

    const index = selectedItems.findIndex(
      (item) => item.id === selectedItem?.id && item.index === selectedItem?.index
    );
    const newArray = [...selectedItems];
    newArray.splice(index, 1);
    newArray.push(selectedItem);
    setSelectedItems(newArray);
  }

  function deleteElement() {
    if (!selectedItem) return;

    const index = selectedItems.findIndex(
      (item) => item.id === selectedItem?.id && item.index === selectedItem?.index
    );
    const newArray = [...selectedItems];
    newArray.splice(index, 1);
    setSelectedItems(newArray);
    setSelectedItem(null);
  }

  const handleSheetChanges = useCallback((index: any) => {
    setIsSheetExpanded(index > 0);
  }, []);

  const saveScreeshoot = useCallback(async () => {
    try {
      const localUri = await captureRef(viewContainerRef, { quality: 1, format: 'png' });

      navigation.navigate('NewLookDetails', {
        image: { id: new Date().getTime().toString(), uri: localUri },
        items: selectedItems,
        anotherUser: true,
      });
    } catch (error) {
      console.error('error', error);
    }
  }, [selectedItems]);

  useEffect(() => {
    if (!items.length && firstLoad && bottomSheetRef.current) {
      setTimeout(() => {
        bottomSheetRef.current?.expand();
        setFirstLoad(false);
      }, 500);
    }

    // close();
  }, []);

  const bottomSheetHandleComponent = useCallback(() => {
    return (
      <S.BottomSheetHandleContainer>
        <S.BottomSheetHandleButton
          onPress={isSheetExpanded ? handleCollapseSheet : handleExpandSheet}
        >
          <MaterialCommunityIcons name={iconName} size={24} color={theme?.colors?.white} />
        </S.BottomSheetHandleButton>
      </S.BottomSheetHandleContainer>
    );
  }, [isSheetExpanded, iconName]);

  return (
    <S.Wrapper>
      <SidebarFloat show={!!selectedItem} right={4} bottom={90}>
        <S.SideButton onPress={sendToFront}>
          <MaterialCommunityIcons
            name={'arrange-bring-forward'}
            size={24}
            color={theme?.colors?.primary_black}
          />
        </S.SideButton>
        <S.SideButton onPress={sendToback}>
          <MaterialCommunityIcons
            name={'arrange-send-backward'}
            size={24}
            color={theme?.colors?.primary_black}
          />
        </S.SideButton>
        <S.SideButton onPress={deleteElement}>
          <MaterialCommunityIcons
            name={'trash-can'}
            size={24}
            color={theme?.colors?.primary_black}
          />
        </S.SideButton>
      </SidebarFloat>
      <S.WrapperContainer>
        <S.ContainerFrame />
        <S.Container
          ref={viewContainerRef as any}
          onLayout={({ nativeEvent }) => getContentSize(nativeEvent)}
        >
          <S.DraggableContainer
            onTouchStart={() => {
              handleCollapseSheet();
            }}
          />
          {selectedItems.map((item) => (
            <Draggable
              width={250}
              height={250}
              key={`${item.id}_${item.index}`}
              onTouchStart={() => {
                setSelectedItem(item);
                bottomSheetRef.current?.collapse();
              }}
              containerWidth={containerSize.width - 140}
              containerHeight={containerSize.height}
              isSelected={item.id === selectedItem?.id && item.index === selectedItem?.index}
              startY={items ? 1 : undefined}
              startX={items ? 1 : undefined}
            >
              <Image
                source={{ uri: item?.image }}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                cachePolicy="disk"
              />
            </Draggable>
          ))}
        </S.Container>
      </S.WrapperContainer>

      {!!selectedItems?.length && (
        <S.TopFloatButtons>
          <S.TopButton
            onPress={() => {
              setSelectedItems([]);
              setSelectedItem(null);
            }}
          >
            <MaterialCommunityIcons name="reload" size={24} color={theme?.colors?.primary_black} />
          </S.TopButton>
          <S.TopCheckButton
            onPress={() => {
              setSelectedItem(null);

              setTimeout(() => {
                saveScreeshoot();
              }, 150);
            }}
          >
            <MaterialCommunityIcons name="check" size={24} color={theme?.colors?.white} />
          </S.TopCheckButton>
        </S.TopFloatButtons>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: theme?.colors?.primary_black }}
        handleComponent={bottomSheetHandleComponent}
      >
        <BottomSheetContent onItemSelect={onItemSelect} selectedItems={selectedItems} />
      </BottomSheet>
    </S.Wrapper>
  );
}
