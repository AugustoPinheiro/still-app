import styled, { css } from 'styled-components/native';
import { PixelRatio } from 'react-native';
import { Image } from 'expo-image';

const fontScale = PixelRatio.getFontScale();
const photoSize = 82 * fontScale;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 3px;
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 40px;
`;

export const LoadgingContent = styled.View`
  position: relative;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.UNBOUNDED_REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 22.5px;
  text-align: center;

  margin-top: 66px;
`;

export const ContentInput = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 52px;
`;

export const AtNameText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 24px;
  text-align: left;
`;

export const Line = styled.TouchableOpacity<{ hasMarginTop?: boolean, hasMarginBottom?: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;

  ${({ hasMarginTop }) =>
    hasMarginTop &&
    css`
      margin-top: 20px;
    `}

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: 20px;
    `}
`;

export const LineUser = styled.View<{ hasMarginTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: 30px;
  padding: 0 20px;

  ${({ hasMarginTop }) =>
    hasMarginTop &&
    css`
      margin-top: 20px;
    `}
`;

export const FilterButton = styled.TouchableOpacity``;


export const LabelTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SEMI_BOLD};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.primary_black};
  line-height: 18px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme }) => theme.colors.gray02};
  line-height: 18px;
`;

export const UserPhoto = styled(Image)`
  width: ${photoSize}px;
  height: ${photoSize}px;
  border-radius: ${photoSize / 2}px;
  background-color: ${({ theme }) => theme.colors.gray06};
  margin-bottom: 8px;
`;

export const Empty = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 20px 64px;
  width: 100%;
  height: 300px;
`;

export const ContainerHighlight = styled.View`
  padding: 20px 0 0;
  flex: 1;
`;