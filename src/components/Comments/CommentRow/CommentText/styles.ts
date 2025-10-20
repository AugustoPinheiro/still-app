import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  min-height: 21px;
  margin-top: 1px;
  padding-right: 8px;
`;

export const TimeText = styled.Text<{ hasColor?: any }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, hasColor }) => (hasColor ? theme.colors.purplish_blue : theme.colors.gray04)};

  text-align: left;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  top: -20px;
  right: -8px;
  height: 21px;
  width: 32px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.gray05};
`;
