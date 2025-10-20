import FeatherIcon from '@expo/vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 36px 20px;
`;

export const WrapperButtons = styled.View`
  margin-top: auto;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG2}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: center;
  z-index: 1;
`;

export const ContainerClose = styled.View`
  left: 20px;
  top: 26px;
  width: 20px;
  height: 20px;
  z-index: 2;
`;

export const Icon = styled(FeatherIcon)`
  width: 16px;
  height: 16px;
  font-size: 16px;
`;

export const Row = styled.View<{ lessMargin?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SubTitleFolder = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: left;
  margin-top: 40px;
  margin-bottom: 8px;
`;

export const InfoFolder = styled.Text<{ selected?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, selected }) => (!selected ? theme.colors.gray02 : theme.colors.white)};
  text-align: left;
`;

export const TagButton = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary_black : theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary_black : theme.colors.gray02};
  padding: 5px 8px;
  border-radius: 24px;
  margin-right: 16px;
  margin-bottom: 8px;
`;
