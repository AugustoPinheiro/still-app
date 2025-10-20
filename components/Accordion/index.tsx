import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';

import * as S from './styles';

type AccordionProps = {
  title: string;
  description: string;
  active?: boolean;
};

export function Accordion({ title, description, active = false }: AccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState(active);
  const [height, setHeight] = useState<number | 'auto'>(active ? 'auto' : 0);
  const accordionAnimation = useRef(new Animated.Value(0)).current;

  function handleActive() {
    if (activeAccordion) {
      setHeight(0);
      Animated.timing(accordionAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setActiveAccordion(!activeAccordion));
    } else {
      setActiveAccordion(!activeAccordion);

      Animated.timing(accordionAnimation, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      }).start(() => setHeight('auto'));
    }
  }

  return (
    <S.Container>
      <S.Header onPress={handleActive}>
        <S.Title>{title}</S.Title>
        <S.Icon name={activeAccordion ? 'chevron-down' : 'chevron-up'} />
      </S.Header>

      {activeAccordion && (
        <S.Content style={{ height: height === 'auto' ? 'auto' : accordionAnimation }}>
          <S.Description>{description}</S.Description>
        </S.Content>
      )}
    </S.Container>
  );
}
