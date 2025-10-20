import SearchIcon from '@/assets/images/search.svg';
import { normalize } from '@/services/normalize';
import { styled } from 'styled-components/native';

interface Props {
  width?: string;
  error?: boolean;
}

export const Container = styled.View<Props>`
  flex: 1;
`;

export const InputContainer = styled.View<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${normalize(6)}px;

  height: ${normalize(42)}px;
  padding-left: ${normalize(8)}px;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.red01 : theme.colors.gray05)};
  border-radius: 4px;
  background: #fff;
`;

export const Icon = styled(SearchIcon)`
  z-index: 1;
  color: ${({ theme }) => theme.colors.gray05};
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray04,
}))<Props>`
  flex: 1;
  border-radius: 4px;
  justify-content: center;
  height: 100%;

  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;

export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.red01};
  margin-left: 1px;
  margin-top: 2px;
`;
