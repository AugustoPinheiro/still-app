import styled, { css } from 'styled-components/native';
import { Image } from 'expo-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 40px;
  margin-top: 3px;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 40px;
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22.5px;
  text-align: center;

  margin-top: 66px;
`;

export const ContentInput = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 90%;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  text-align: left;
`;

export const Line = styled.View<{ hasMarginTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;

  ${({ hasMarginTop }) =>
    hasMarginTop &&
    css`
      margin-top: 20px;
    `}
`;

export const FilterButton = styled.TouchableOpacity`
  max-width: 5%;
  align-items: center;
  width: 100%;
  height: 48px;
  justify-content: center;
`;

export const ContainerSuggest = styled.View`
  padding: 40px 0 0;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 24px;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 24px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;

// Novos estilos para cards de produtos em destaque
export const HighlightSection = styled.View`
  padding: 0 20px;
  margin-bottom: 32px;
`;

export const ProductsSection = styled.View`
  padding: 0 20px;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  margin-bottom: 16px;
`;

export const HorizontalScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 0,
    gap: 16,
  },
})`
  margin-bottom: 24px;
`;

export const ProductCard = styled.TouchableOpacity`
  width: 200px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
  overflow: hidden;
`;

export const ProductImageContainer = styled.View`
  position: relative;
  width: 100%;
  height: 140px;
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const StoreBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${({ theme }) => theme.colors.primary_black};
  padding: 6px 10px;
  border-radius: 16px;
`;

export const StoreBadgeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ProductInfo = styled.View`
  padding: 16px;
`;

export const ProductTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
  margin-bottom: 10px;
`;

export const ProductOwner = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
`;

export const OwnerPhoto = styled(Image)`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const OwnerName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
  flex: 1;
`;

export const ProductPrice = styled.View`
  align-items: flex-start;
`;

export const PriceText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

// Novos estilos para o grid de produtos melhorado
export const ProductsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const GridProductCard = styled.TouchableOpacity`
  width: 48%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 4;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const GridProductImage = styled(Image)`
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const GridProductInfo = styled.View`
  padding: 16px;
`;

export const GridProductTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 16px;
  margin-bottom: 10px;
`;

export const GridProductOwner = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  gap: 6px;
`;

export const GridOwnerPhoto = styled(Image)`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const GridOwnerName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
  flex: 1;
`;

export const GridProductPrice = styled.View`
  align-items: flex-start;
`;

export const GridPriceText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const LoadMoreButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary_black};
  padding: 18px 28px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

export const LoadMoreText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 300px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  margin-bottom: 8px;
`;

export const EmptySubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
  line-height: 20px;
`;
