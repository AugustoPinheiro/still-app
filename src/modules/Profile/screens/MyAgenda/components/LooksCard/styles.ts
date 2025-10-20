import styled from 'styled-components/native';

export const Container = styled.View<{ width?: number }>`
  width: ${({ width }) => width ? width - 8 : '100%'}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  align-items: center;
  margin-left: 4px;
  margin-right: 4px;
  padding: 21px 20px;
  gap: 28px;
`;

export const LoadingContainer = styled.View<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const CardContainer = styled.TouchableOpacity`
  position: relative;
  flex: 1;
`;

export const CountContainer = styled.View`
  position: absolute;
  bottom: -2px;
  right: -4px;
  background-color: ${({ theme }) => theme.colors.gray06};
  padding: 4px;
  border-radius: 4px;
  z-index: 99;
`;

export const CountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;
