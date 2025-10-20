import React, { useRef, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import MasonryList from '@react-native-seoul/masonry-list';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { BackdropBottomSheet } from '@/components/BottomSheet/BackdropBottomSheet';
import { ColumnItem } from '@/modules/Closet/components/CardColumn';
import { CardFolder } from '@/modules/Closet/components/CardFolder';
import { FoldersOptions } from '@/modules/Closet/components/FoldersOptions';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';

import * as S from './styles';

type TAllFoldersRouteProps = {
  origin: {
    from: 'clothings' | 'combinations' | 'inspirations';
  };
};

export function AllFolders() {
  const navigation = useNavigation();
  const { folders, dispatch, setSelectedFolder } = useCloset();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { params } = useRoute<RouteProp<TAllFoldersRouteProps, 'origin'>>();

  const from = params?.from;

  const numColumns = 2;

  const filteredFolders = React.useMemo(
    () => folders?.filter((item) => (from ? item._count[from] > 0 : true)),
    []
  );

  function closeBottomSheet() {
    bottomSheetRef.current?.close();

    setTimeout(() => {
      setShowBottomSheet(false);
    }, 150);
  }

  function expandBottomSheet() {
    setShowBottomSheet(true);

    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 150);
  }

  const handleBackDrop = (props) => (
    <BackdropBottomSheet
      backgroundColor={'transparent'}
      onPressBackDrop={() => {
        closeBottomSheet();
      }}
      {...props}
    />
  );

  function goToDetails(item) {
    closeBottomSheet();
    setSelectedFolder(item);

    navigation.navigate('FolderDetails', { title: item?.title });
  }

  const renderItem = React.useCallback(
    ({ item, i: index }: any) => (
      <ColumnItem numColumns={numColumns} index={index}>
        <CardFolder
          item={item}
          full
          onPress={() => {
            if (!dispatch) return;
            setSelectedFolder(item);
            expandBottomSheet();
          }}
          onCardPress={() => goToDetails(item)}
          marginBottom={32}
        />
      </ColumnItem>
    ),
    []
  );

  return (
    <S.Wrapper>
      <S.Container>
        <MasonryList
          data={filteredFolders as any}
          numColumns={numColumns}
          renderItem={renderItem}
        />
      </S.Container>

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1, 81]}
          style={{ marginTop: 1 }}
          index={1}
          handleStyle={{ backgroundColor: 'white' }}
          handleComponent={() => null}
          enableHandlePanningGesture={false}
          backdropComponent={handleBackDrop}
        >
          <FoldersOptions />
        </BottomSheet>
      )}
    </S.Wrapper>
  );
}
