import styled from 'styled-components/native';

export const Wrapper = styled.View`
  padding: 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
    flexGrow: 1,
  },
})``;

export const Section = styled.View`
  margin-bottom: 32px;
  gap: 16px;
`;

export const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-transform: uppercase;
`;
