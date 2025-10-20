import { styled } from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXX}px;
  color: ${({ theme }) => theme.colors.primary_black};

  text-transform: uppercase;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};

  margin-top: 52px;
`;

export const SubText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray04};

  margin-top: 20px;
`;

export const ButtonContent = styled.View`
  width: 100%;

  padding: 0 20px 44px;
`;
