import { Image } from 'expo-image';
import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity<{
  flexBasis?: string;
  marginBottom?: number;
  full?: boolean;
}>`
  ${({ flexBasis, full }) =>
    flexBasis
      ? css`
          flex-basis: ${flexBasis};
        `
      : css`
          width: ${full ? '96%' : '150px'};
        `}

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${marginBottom}px;
    `}
  gap: 8px;
`;

export const LoadingContainer = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray05};
  background-color: ${({ theme }) => theme.colors.gray06};
`;

export const CardBottom = styled.View`
  padding: 0 1px;
`;

export const CardBottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardOptionButton = styled.TouchableOpacity``;

export const CardTitle = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
`;

export const CardCountText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray02};
`;
