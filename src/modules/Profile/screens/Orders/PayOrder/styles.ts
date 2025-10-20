import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';

import { DefaultScreen } from '@/components/DefaultScreen';
import { Button } from '@/components/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const fontScale = PixelRatio.getFontScale();
const photoSize = 32 * fontScale;

export const Wrapper = styled(DefaultScreen)`
  padding: 0 24px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text<{ textAlign?: string}>`
  font-family: ${({ theme }) => theme.fonts.BOLD};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
  margin-bottom: 18px;
  text-transform: uppercase;
`;

export const Text = styled.Text<{ textAlign?: string}>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
`;

export const TextMD = styled.Text<{ textAlign?: string}>`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.MD}px;
  color: ${({ theme }) => theme.colors.primary_black};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
`;

export const TextGray = styled.Text<{ textAlign?: string }>`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.SM}px;
  color: ${({ theme }) => theme.colors.gray03};
  text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'}
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SelectContainer = styled.View`
  margin-bottom: 18px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.REGULAR};
  font-size: ${({ theme }) => theme.fontSizes.XXS}px;
  color: ${({ theme }) => theme.colors.gray03};
  margin-left: 1px;
  margin-bottom: 8px;
`;

export const ButtonContent = styled.View`
  width: 100%;
  justify-content: flex-end;
  margin-top: 52px;
`;

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.colors.red02,
}))`
  width: 150px;
  height: 150px;
  font-size: 150px;
  margin-bottom: 50px;
`;

export const Center = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;