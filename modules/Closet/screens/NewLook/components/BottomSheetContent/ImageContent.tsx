import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { ClosetClothingType } from '@/types/ClosetClothingType';

import * as S from './styles';

type BottomSheetContentProps = {
  onItemSelect: (item: ClosetClothingType) => void;
  selectedItems: ClosetClothingType[];
  item: ClosetClothingType;
};

function ImageContentComponent({ onItemSelect, selectedItems, item }: BottomSheetContentProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [debounce, setDebounce] = React.useState(true);

  const isItemSelected = (item: ClosetClothingType) =>
    selectedItems?.some((selected) => selected?.id === item?.id);

  return (
    <S.ItemContainer
      onPress={() => {
        if (isLoaded && debounce) {
          onItemSelect(item);
          setDebounce(false);

          setTimeout(() => {
            setDebounce(true);
          }, 1500);
        }
      }}
    >
      <S.ImageContent
        source={{ uri: item?.image, width: 1000, height: 1000, isAnimated: false }}
        contentFit="contain"
        onLoad={() => setIsLoaded(true)}
        cachePolicy="disk"
      />
      {isItemSelected(item) && (
        <S.ImageOverlayCheck>
          <MaterialCommunityIcons name="check" size={48} color="#FFF" />
        </S.ImageOverlayCheck>
      )}
    </S.ItemContainer>
  );
}

export const ImageContent = React.memo(ImageContentComponent);
