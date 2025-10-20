import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 0;
`;

export const ContainerEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  min-height: 350px;
`;

export const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray04};
  text-align: center;
  padding: 0 12px;
  margin-top: 8px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 36px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 32px 20px 0px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 20px;
  min-height: 500px;
`;

export const Section = styled.View`
  gap: 16px;
  margin-top: 40px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`;

export const SectionTitle = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;

export const SectionButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const SectionButton = styled.TouchableOpacity``;

export const SectionButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: right;
`;

export const ImageOverlayCheck = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;

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
  margin-right: 20px;

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
