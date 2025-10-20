import { ScrollViewProps } from 'react-native';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export const Container = styled(BottomSheetScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
})<ScrollViewProps>`
  flex: 1;
  padding: 32px 20px 0;
  margin-top: 3px;
`;

export const CountContainer = styled.View`
  flex-direction: row;
  height: 40px;
  gap: 24px;
  border-radius: 4px;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  margin-bottom: 32px;

  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const CountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const CountButtonContainer = styled.View``;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-bottom: 32px;
`;
