import 'styled-components';

interface ThemeType {
  colors: {
    white: string;
    gray: {
      back: string;
      dark: string;
      light: string;
      stroke: string;
      middle: string;
    };
    green: string;
    yellow: string;
    orange: string;
    blue: {
      dark: string;
      light: string;
      middle: string;
      hover: string;
    };
    turquoise: string;
    purple: string;
    black: {
      dark: string;
      light: string;
    };
    red: string;
  };
  font: {
    sm: string;
    base: string;
    xl: string;
    xxl: string;
  };
  borderRadius: string;
  animationTime: string;
  border: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
