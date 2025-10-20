import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  gap: 32px;
`;

export const ModalHeader = styled.View`
  gap: 16px;
`;

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 27px;
  text-align: center;
`;

export const ModalSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  text-align: center;
`;

export const ModalImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ModalPartsContainer = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: center;
  justify-content: center;
`;

export const ModalPartsImage = styled(Image)`
  width: 55px;
  height: 55px;
  border-radius: 3px;
`;
