import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Button } from '@/components/Button';
import { useBottomSheet } from '@/contexts/BottomSheet.contexts';

import * as S from './styles';

export function PersonFilters() {
  const theme = useTheme();
  const { close } = useBottomSheet();
  const filtersType = ['Elegante', 'Esportivo', 'Casual', 'Urbano', 'Clássico'];

  const [selecteds, setSelecteds] = useState<string[]>([]);

  function handleGoBack() {
    close();
  }
  return (
    <S.Container>
      <S.ContainerClose>
        <TouchableOpacity onPress={handleGoBack}>
          <S.Icon name="x" color={theme.colors.gray04} />
        </TouchableOpacity>
      </S.ContainerClose>

      <>
        <S.Title>FILTROS</S.Title>
        <S.SubTitleFolder>Estilo</S.SubTitleFolder>
        <S.Row lessMargin>
          {filtersType.map((item) => (
            <S.TagButton
              key={item}
              selected={!!selecteds.find((it) => it === item)}
              onPress={() => {
                setSelecteds((prev) => {
                  if (!prev?.length) return [item];
                  if (prev?.find((it) => it === item)) {
                    return prev?.filter((it) => it !== item);
                  } else {
                    return [...prev, item];
                  }
                });
              }}
            >
              <S.InfoFolder selected={!!selecteds.find((it) => it === item)}>{item}</S.InfoFolder>
            </S.TagButton>
          ))}
        </S.Row>
        <S.WrapperButtons>
          <Button title="Aplicar" disabled={!selecteds.length} />
          <Button title="Limpar Filtros" type="secondary" />
        </S.WrapperButtons>
      </>
    </S.Container>
  );
}
