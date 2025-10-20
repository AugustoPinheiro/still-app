import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 3px;
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

export const ContentLook = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
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

export const Line = styled.View<{ hasMarginTop?: boolean }>`
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

export const ContainerSuggest = styled.View`
  padding: 0 0 0;
  margin-top: 16px;
`;

export const ContainerHighlight = styled.View`
  padding: 40px 0 0;
  flex: 1;
`;

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
