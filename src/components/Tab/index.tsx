import React, { RefObject, useEffect, useRef } from 'react';
import { Animated, Easing, FlatList, View } from 'react-native';

import * as S from './styles';

type TTab = {
  title: string;
  component: React.JSX.Element;
  ref: RefObject<View>;
};

interface ITabProps {
  tabs: TTab[];
  offset?: number;
  onTabChange?: (index: number) => void;
  activiteTab?: number;
  overflowX?: boolean
}

type MeasureType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function Tab({ tabs, offset = 0, onTabChange, activiteTab = 0, overflowX = false }: ITabProps) {
  const [measures, setMeasures] = React.useState<MeasureType[]>([]);
  const [activeTab, setActiveTab] = React.useState(activiteTab);
  const containerRef = useRef<any>(null);
  const indicatorXAnim = useRef(new Animated.Value(0)).current;
  const indicatorWidthAnim = useRef(new Animated.Value(0)).current;
  const length = tabs?.length;

  const indicatorAnimated = (index: number) =>
    Animated.parallel([
      Animated.timing(indicatorXAnim, {
        toValue: measures[index]?.x,
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
      Animated.timing(indicatorWidthAnim, {
        toValue: measures[index]?.width,
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
    ]).start();

  function isActiveTab(index: number) {
    return Boolean(activeTab === index);
  }

  function handleClickedTab(index: number, event: any) {
    onTabChange?.(index);
    setActiveTab(index);
    indicatorAnimated(index);
  }

  useEffect(() => {
    const measuresItems: MeasureType[] = [];
    if (containerRef.current === null) return;

    tabs.forEach((item, index) => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          measuresItems.push({ x, y, width, height });

          if (index === activeTab) {
            indicatorXAnim.setValue(x);
            indicatorWidthAnim.setValue(width);
          }

          if (measuresItems.length === tabs.length) {
            setMeasures(measuresItems);
          }
        },
        () => console.error('measure error')
      );
    });
  }, [containerRef?.current]);

  return (
    <S.Container>
      <S.TabContent ref={containerRef}>
        {overflowX ? 
          <FlatList
            data={tabs}
            keyExtractor={(item, index) => `${item?.ref}_${index}`}
            renderItem={({ item, index }) => <>
                <S.TabContentTitle
                  key={index}
                  length={length}
                  ref={item.ref}
                  active={index === activeTab}
                  onPress={(event: any) => handleClickedTab(index, event)}
                >
                  <S.TabTitle active={isActiveTab(index)}>{item.title}</S.TabTitle>
                </S.TabContentTitle>
            </>}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 30, paddingHorizontal: 15 }}
          ></FlatList> : <>
            {tabs.map((tab, index) => (
              <S.TabContentTitle
                key={index}
                length={length}
                ref={tab.ref}
                onPress={(event: any) => handleClickedTab(index, event)}
              >
                <S.TabTitle active={isActiveTab(index)}>{tab.title}</S.TabTitle>
              </S.TabContentTitle>
            ))}
            <S.Indicator
              style={{ transform: [{ translateX: indicatorXAnim }], width: indicatorWidthAnim ?? 0 }}
            />
          </>
        }
      </S.TabContent>
      <S.TabComponent>{tabs[activeTab].component}</S.TabComponent>
    </S.Container>
  );
}
