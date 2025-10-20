import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import * as amplitude from '@amplitude/analytics-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import { Image } from 'expo-image';

import { BackdropBottomSheet } from '@/components/BottomSheet/BackdropBottomSheet';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { Modal } from '@/components/Modal';
import { Tab } from '@/components/Tab';
import { useNavigationUtils } from '@/hooks/useNavigationUtils';
import { AddFolder } from '@/modules/Closet/components/AddFolder';
import { AddPart } from '@/modules/Closet/components/AddPart';
import { CombinationsOptions } from '@/modules/Closet/components/CombinationsOptions';
import { Filters } from '@/modules/Closet/components/Filters';
import { FoldersOptions } from '@/modules/Closet/components/FoldersOptions';
import { InspirationsOptions } from '@/modules/Closet/components/InspirationsOptions';
import { PartsOptions } from '@/modules/Closet/components/PartsOptions';
import { useCloset } from '@/modules/Closet/contexts/closet.contexts';
import { ClothingParts } from '@/modules/Closet/screens/ClothingParts';
import { Combinations } from '@/modules/Closet/screens/Combinations';
import { Inspirations } from '@/modules/Closet/screens/Inspirations';
import { GenericPageProp } from '@/types/GenericPageProp';

import * as S from './styles';

type ClosetHomeProps = GenericPageProp & {
  route: {
    params: {
      screenTo: string;
    };
  };
};

const tabs = [
  {
    title: 'Peças',
    component: <ClothingParts />,
    ref: React.createRef(),
  },
  {
    title: 'Combinações',
    component: <Combinations />,
    ref: React.createRef(),
  },
  {
    title: 'Inspirações',
    component: <Inspirations />,
    ref: React.createRef(),
  },
];

export function ClosetHome({ route }: ClosetHomeProps) {
  const [firstLoading, setFirstLoading] = React.useState(true);
  const [showMyLookModal, setShowMyLookModal] = React.useState(true);
  const { params } = route;
  const screenTo = params?.params?.screenTo;
  const navigation = useNavigation();
  const { showTabBar } = useNavigationUtils(navigation);
  const listRef = useRef<ScrollView>(null);

  useScrollToTop(listRef as any);

  const {
    bottomSheetOptions,
    clearAllSelectedItems,
    dispatch,
    bottomSheetRef,
    closeBottomSheet,
    showBottomSheet,
    expandBottomSheet,
    isSelectingClothings,
    isSelectingLooks,
    isSelectingInspirations,
    isLoading,
    currentTab,
    isFetchingNextPageClothings,
    hasNextPageClothings,
    fetchNextPageClothings,
    isFetchingNextPageLooks,
    hasNextPageLooks,
    fetchNextPageLooks,
    isLoadingClosetProfile,
    isFetchingNextPageInspirations,
    hasNextPageInspirations,
    fetchNextPageInspirations,
    closetProfile,
    inspiration,
    setInspiration,
    refetchAllCloset,
  } = useCloset();

  useEffect(() => {
    if (isLoading) return;

    if (screenTo && firstLoading) {
      const paramsRedirect = params?.params?.params;

      // @ts-expect-error
      navigation.navigate(screenTo, {
        screen: paramsRedirect?.screen,
        params: paramsRedirect?.params,
      });

      // navigation.setParams(undefined);

      clearAllSelectedItems();
    }

    setFirstLoading(false);
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      showTabBar();
    }, [])
  );

  const numbersData = [
    { id: 1, value: `${closetProfile?.utilization}%`, label: 'Aproveitamento' },
    { id: 2, value: closetProfile?.total_looks, label: 'Looks criados' },
    { id: 3, value: closetProfile?.total_clothings, label: 'Peças no closet' },
  ];
  const [snapPoints, setSnapPointsState] = React.useState(bottomSheetOptions?.snapPoints ?? []);

  const handleOnTabChange = (index: number) => {
    amplitude.track(`Click Tab ${tabs[index].title}`);
    clearAllSelectedItems();
  };

  const handleCloseAddPart = () => {
    if (!dispatch) return;

    if (isSelectingClothings) {
      dispatch({ type: 'part' });
    } else if (isSelectingLooks) {
      dispatch({ type: 'combinations' });
    } else if (isSelectingInspirations) {
      dispatch({ type: 'inspirations' });
    }

    expandBottomSheet();
  };

  const handleCloseAddFolderInAddPart = () => {
    dispatch({ type: 'addPart' });
    expandBottomSheet();
  };

  const handleBackDrop = (props) => (
    <BackdropBottomSheet
      backgroundColor={bottomSheetOptions?.hasBackdrop ? undefined : 'transparent'}
      onPressBackDrop={() => {
        if (bottomSheetOptions.bottomSheetComponent === 'addPart') {
          handleCloseAddPart();
          return;
        }
        if (bottomSheetOptions.bottomSheetComponent === 'addFolder') {
          handleCloseAddFolderInAddPart();
          return;
        }

        closeBottomSheet();
      }}
      {...props}
    />
  );

  function handleAddOnFolder() {
    if (!dispatch) return;

    dispatch({ type: 'addPart' });
  }

  function handleAddNewFolder() {
    if (!dispatch) return;

    dispatch({ type: 'addFolder' });
  }

  function handleBottomSheetContent() {
    if (!bottomSheetOptions?.bottomSheetComponent) return <></>;

    switch (bottomSheetOptions?.bottomSheetComponent) {
      case 'filters':
        return <Filters />;
      case 'addPart':
        return <AddPart onClose={handleCloseAddPart} addNewFolder={handleAddNewFolder} />;
      case 'addFolder':
        return <AddFolder onClose={handleCloseAddFolderInAddPart} />;
      case 'folder':
        return <FoldersOptions />;
      case 'combinations':
        return <CombinationsOptions addOnFolder={handleAddOnFolder} />;
      case 'inspirations':
        return <InspirationsOptions addOnFolder={handleAddOnFolder} />;
      case 'part':
        return <PartsOptions addOnFolder={handleAddOnFolder} />;
      default:
        return <></>;
    }
  }

  function handleNewClothingPart() {
    const routes = {
      index: 0,
      routes: [{ name: 'Closet', params: { screenTo: 'NewClothingPart' } }],
    };

    navigation?.dispatch(CommonActions.reset(routes));
  }

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (!showBottomSheet) return;
      setSnapPointsState(['90%']);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (!showBottomSheet) return;
      setSnapPointsState(bottomSheetOptions?.snapPoints);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
      setSnapPointsState(bottomSheetOptions?.snapPoints);
    };
  }, [Keyboard, bottomSheetOptions?.snapPoints]);

  useEffect(() => {
    setSnapPointsState(bottomSheetOptions?.snapPoints);
  }, [bottomSheetOptions?.snapPoints]);

  const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }) => {
    const offset = Platform.OS === 'ios' ? 100 : 320;
    const paddingToBottom = contentSize.height - offset;

    return layoutMeasurement.height + contentOffset.y >= paddingToBottom;
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      if (isCloseToBottom(nativeEvent)) {
        if (currentTab === 'clothing') {
          if (isFetchingNextPageClothings || !hasNextPageClothings) return;

          fetchNextPageClothings();
        }

        if (currentTab === 'look') {
          if (isFetchingNextPageLooks || !hasNextPageLooks) return;
          fetchNextPageLooks();
        }

        if (currentTab === 'inspiration') {
          if (isFetchingNextPageInspirations || !hasNextPageInspirations) return;
          fetchNextPageInspirations();
        }
      }
    },
    [
      currentTab,
      isFetchingNextPageClothings,
      isFetchingNextPageLooks,
      isFetchingNextPageInspirations,
      hasNextPageClothings,
      hasNextPageLooks,
      hasNextPageInspirations,
      fetchNextPageClothings,
      fetchNextPageLooks,
      fetchNextPageInspirations,
    ]
  );

  if ((isLoading && firstLoading) || isLoadingClosetProfile) {
    return <Loading hasBackground={false} />;
  }

  function handleGoToClothingDetails(item: any) {
    navigation.navigate('ClothingDetails', { item });
  }

  return (
    <S.Wrapper hasHeader={false}>
      <S.Container>
        <S.ScrollContainer
          ref={listRef}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={400}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetchAllCloset} />}
        >
          <S.Header>
            <S.Title>Meu Closet</S.Title>
          </S.Header>

          <S.NumbersContainer>
            {numbersData.map((item) => (
              <S.NumberItem key={item.id}>
                <S.NumberValue>{item.value}</S.NumberValue>
                <S.NumberLabel>{item.label}</S.NumberLabel>
              </S.NumberItem>
            ))}
          </S.NumbersContainer>

          {showMyLookModal && (
            <S.MyLookContainer>
              <S.MyLookRow>
                <S.TitleLook>Look do dia</S.TitleLook>
                <TouchableOpacity onPress={() => setShowMyLookModal(false)}>
                  <Image
                    source={require('../../../../assets/images/close.png')}
                    contentFit="contain"
                    style={{ width: 17, height: 17 }}
                  />
                </TouchableOpacity>
              </S.MyLookRow>
              <S.SubtitleLook>
                Cadastre o seu look para que as estatísticas do seu closet sejam ainda mais
                precisas.
              </S.SubtitleLook>
              <Button title="Informar meu look" marginBottom={0} onPress={handleNewClothingPart} />
            </S.MyLookContainer>
          )}

          <S.TabContainer>
            <Tab tabs={tabs as any} offset={20} onTabChange={handleOnTabChange} />
          </S.TabContainer>
        </S.ScrollContainer>
      </S.Container>

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          style={{ marginTop: 1 }}
          index={bottomSheetOptions.index}
          handleStyle={{ backgroundColor: bottomSheetOptions.backgroundColor }}
          handleComponent={() => null}
          enableHandlePanningGesture={bottomSheetOptions?.hasBackdrop}
          backdropComponent={
            (isSelectingClothings || isSelectingLooks || isSelectingInspirations) &&
            !bottomSheetOptions.hasBackdrop
              ? undefined
              : handleBackDrop
          }
        >
          {handleBottomSheetContent()}
        </BottomSheet>
      )}
      {inspiration ? (
        <Modal full onClickOutside={() => setInspiration(undefined)}>
          <S.SectionClose onPress={() => setInspiration(undefined)}>X</S.SectionClose>
          <S.ModalImage
            source={{ uri: inspiration?.image }}
            recyclingKey={inspiration?.image}
            contentFit="contain"
            cachePolicy="disk"
          />
          {/* {inspiration?.url ? (
            <S.SectionLink
              onPress={async () => {
                await Linking.openURL(inspiration?.url);
              }}
            >
              <S.Icon name="link-variant" />
            </S.SectionLink>
          ) : (
            <></>
          )} */}
          {inspiration?.clothings?.length ? (
            <S.Section>
              <S.SectionTitle>Peças</S.SectionTitle>
              <FlatList
                data={inspiration?.clothings}
                horizontal
                contentContainerStyle={{ gap: 16 }}
                keyExtractor={(item) => item?.clothing.image}
                renderItem={({ item }) => (
                  <S.SectionButton
                    onPress={() => {
                      handleGoToClothingDetails(item.clothing);
                    }}
                  >
                    <S.SectionImage
                      source={{ uri: item?.clothing.image }}
                      recyclingKey={item?.clothing.image}
                      cachePolicy="disk"
                    />
                  </S.SectionButton>
                )}
              />
            </S.Section>
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}
    </S.Wrapper>
  );
}
