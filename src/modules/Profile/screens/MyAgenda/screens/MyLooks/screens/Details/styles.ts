import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
