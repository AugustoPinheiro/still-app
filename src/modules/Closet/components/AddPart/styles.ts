import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding: 20px 20px 0;
  gap: 16px;
  flex: 1;
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

export const TitleButton = styled.View`
  gap: 8px;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;
