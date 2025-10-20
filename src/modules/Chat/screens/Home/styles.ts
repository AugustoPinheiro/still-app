import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TalkContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TalkText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const TalkButton = styled.TouchableOpacity``;

export const TalkIcon = styled(MaterialCommunityIcons)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.primary_black};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
`;
