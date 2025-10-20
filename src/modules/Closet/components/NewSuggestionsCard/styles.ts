import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 82px;
  background-color: ${({ theme }) => theme.colors.gray06};
  border-radius: 8px;
  margin: 20px 20px 0 20px;

  shadow-color: ${({ theme }) => theme.colors.primary_black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const backgroundImage = styled(Image)`
  flex: 1;
  border-radius: 8px;
`;

export const Content = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 16px 16px;

  gap: 8px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary_black}99;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ClircleSpan = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;

  width: 16px;
  height: 16px;
  border-radius: 8px;
  padding: 2px;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const ClircleSpanContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary_red};
  border-radius: 8px;
`;
