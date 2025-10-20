import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 51px 20px 0px;

  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const Content = styled.TouchableOpacity`
  flex-direction: row;
  padding: 32px 0px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray06};
`;

export const LeftContent = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 24px;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 22px;
  background-color: rgba(109, 123, 59, 0.3);

  align-items: center;
  justify-content: center;
`;

export const NameDataContainer = styled.View`
  gap: 8px;
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const DataText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ValueText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: right;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

export const ModalHeader = styled.View`
  gap: 16px;
  align-items: center;
  width: 100%;
`;

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const ModalSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ModalContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;

export const ModalImage = styled(Image)`
  width: 102px;
  height: 102px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const ModalButtonsContainer = styled.View`
  margin-top: 32px;
  gap: 16px;
  width: 100%;
`;
