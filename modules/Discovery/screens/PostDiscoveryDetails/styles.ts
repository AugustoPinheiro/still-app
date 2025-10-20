import styled from 'styled-components/native';

export const Wrapper = styled.View`
  padding: 20px 0;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
