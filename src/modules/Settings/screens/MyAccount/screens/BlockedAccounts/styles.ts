import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

export const Container = styled.View``;

export const Item = styled.View`
  flex-direction: row;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
`;

export const ItemInfo = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const ItemImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ItemName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ItemButtonContainer = styled.View`
  min-width: 100px;
  align-items: center;
  justify-content: center;
`;
