import theme from '../theme';

const { colors, fonts, fontSizes } = theme;

type IColors = typeof colors;

type IFonts = typeof fonts;

type IFontSizes = typeof fontSizes;

export default interface IThemeInterface {
  colors: IColors;
  fonts: IFonts;
  fontSizes: IFontSizes;
}
