import { styled } from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.LG}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22px;
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};

  margin-top: 12px;
  margin-bottom: 52px;
`;

export const TagDiscoverContainer = styled.TouchableOpacity`
  margin-top: 52px;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const ButtonContent = styled.View`
  width: 100%;

  justify-content: flex-end;
  padding: 0 0 44px;
`;
