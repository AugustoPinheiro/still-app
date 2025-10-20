import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  gap: 16px;
  flex-direction: row;
  flex: 1;
`;

export const EmptyContainer = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray05};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const ImageContainer = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const InfoContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const LocationText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray04};
`;
