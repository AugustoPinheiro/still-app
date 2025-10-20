import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { height, width } = Dimensions.get('window');

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
})<{ ref?: any }>`
  padding: 20px;
  flex: 1;
  margin-top: 2px;
`;

export const Header = styled.View`
  padding: 32px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderDateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const HeaderDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const HeaderDateSecondary = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const CardContainer = styled.View`
  gap: 24px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.gray06};
  border-radius: 12px;
  gap: 24px;
`;

export const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ScrollViewCardImages = styled.ScrollView`
  width: ${width - 40 - 32}px;
`;

export const CardImages = styled.View`
  flex-direction: row;
  gap: 8px;
  width: ${width - 40 - 32}px;
`;

export const CardImage = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CardImageEmpty = styled.View`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray05};
`;

export const CardFooter = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const CardDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  height: ${height * 0.5}px;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;
