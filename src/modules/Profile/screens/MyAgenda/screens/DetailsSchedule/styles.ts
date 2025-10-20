import { Dimensions } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image as FastImage } from 'expo-image';
import styled from 'styled-components/native';

import { Button } from '@/components/Button';
import { DefaultScreen } from '@/components/DefaultScreen';

const { width } = Dimensions.get('window');

const cardWidth = (width - 56) / 2;

export const Wrapper = styled(DefaultScreen).attrs({
  hasHeader: false,
})`
  padding-top: 8px;
`;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
    flexGrow: 1,
  },
})``;

export const ContainerModal = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px 20px 20px;
`;

export const TagsContainer = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    marginTop: 8,
  },
  style: {
    width: '100%',
    backgroundColor: 'red',
  },
})``;

export const TitleModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  padding: 0 30px;
  text-align: center;
  margin-bottom: 15px;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const BrandText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ContainerHeader = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 15px;
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const BackButtonContainer = styled.View``;

export const EditButtonContainer = styled.TouchableOpacity``;

export const ButtonSave = styled(Button)`
  margin-top: auto;
`;

export const Content = styled.View`
  padding: 32px 20px 0;
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  margin: 8px 0 16px;
`;

export const OfferButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const OfferButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const RowDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

export const Circle = styled.View<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme, active }) => (active ? theme.colors.green : theme.colors.gray05)};
  margin-right: 16px;
`;

export const AddLookButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 170px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const MoreDetails = styled.View`
  margin-top: 24px;
`;

export const TagItem = styled.View`
  border-radius: 24px;
  margin-right: 16px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary_black};
`;
export const ValueTag = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  padding: 0 20px;
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.View``;

export const CardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 48px;
`;

export const CardContainer = styled.View`
  flex-basis: ${cardWidth}px;
`;

export const Card = styled.TouchableOpacity``;

export const CardImageContainer = styled.View<{ hasStyle?: boolean; isOdd?: boolean }>`
  height: 170px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardImage = styled(Image)`
  flex: 1;
  border-radius: 8px;
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_black}99; /* like opacity: 0.6; */
`;

export const CountContainer = styled.View`
  flex-direction: row;
  flex: 1;
  height: 40px;
  gap: 24px;
  border-radius: 4px;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  margin-top: 24px;

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

export const BottomSheetContainer = styled.TouchableOpacity<{ isSelecting?: boolean }>`
  flex: 1;
  background-color: ${({ theme, isSelecting }) =>
    !isSelecting ? theme.colors.gray05 : theme.colors.primary_black};
  align-items: center;
  justify-content: center;
`;

export const BottomSheetButton = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const BottomSheetText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.colors.primary_black,
}))`
  width: 24px;
  height: 24px;
  font-size: 24px;
`;

export const PackedContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const PackedCheckbox = styled.View<{ isPacked?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme, isPacked }) => isPacked ? theme.colors.primary_black : theme.colors.gray04};
  background-color: ${({ theme, isPacked }) => isPacked ? theme.colors.primary_black : theme.colors.white};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

export const PackedText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
`;
