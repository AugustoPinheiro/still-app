import FeatherIcon from '@expo/vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 36px 0;
`;

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px 20px 20px;
`;

export const ContentInput = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px 20px;
`;

export const ArrowBackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  left: 1px;
  width: 40px;
  height: 40px;
  z-index: 1;
`;

export const ArrowBackButton = styled.TouchableOpacity``;

export const Icon = styled(FeatherIcon)`
  margin-left: 16px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
`;
