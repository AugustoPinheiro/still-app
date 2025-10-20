import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px;
  gap: 24px;
`;

export const Header = styled.View`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  left: 20px;
  width: 24px;
  height: 24px;
`;

export const ImageContainer = styled(Image)`
  width: 100%;
  height: 240px;
  background-color: ${({ theme }) => theme.colors.gray05};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray06};

  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;
