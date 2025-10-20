import { Image as ExpoImage } from 'expo-image';
import { styled } from 'styled-components/native';

type CardProps = {
  selected?: boolean;
};

export const CardContainer = styled.TouchableOpacity<CardProps>`
  flex-basis: 47%;
  height: 190px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary_red : theme.colors.white};

  border-radius: 8px;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.colors.primary_red : theme.colors.gray05)};

  margin-bottom: 26px;
`;

export const Image = styled(ExpoImage)`
  width: 100%;
  height: 142px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray06};

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const LabelContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  border-top-width: 0.5px;
  border-top-style: solid;
  border-top-color: ${({ theme }) => theme.colors.gray05};

  padding: 0 16px;
`;

export const Label = styled.Text<CardProps>`
  font-family: ${({ theme }) => theme.fonts.MEDIUM};
  font-size: ${({ theme }) => theme.fontSizes.XS}px;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray03)};
`;
