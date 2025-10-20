import 'styled-components/native';

import type IThemeInterface from '../IThemeInterface';

declare module 'styled-components/native' {
  export interface DefaultTheme extends IThemeInterface {}
}
declare module 'styled-components' {
  export interface DefaultTheme extends IThemeInterface {}
}
