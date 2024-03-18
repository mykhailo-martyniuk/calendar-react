import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    white: '#FFFFFF',
    gray: {
      back: '#EEEFF1',
      dark: '#CACFD2',
      light: '#EBEBEB',
      stroke: '#899297',
      middle: '#E3E4E6',
    },
    green: '#60BE50',
    yellow: '#F2D701',
    orange: '#FFAB49',
    blue: { dark: '#0378BE', light: '#B3E1F7', middle: '#007bff', hover: '#0056b3' },
    turquoise: '#50E798',
    purple: '#C376E0',
    black: {
      dark: '#302F2D',
      light: '#59595A',
    },
    red: '#FF0000',
  },
  font: {
    sm: '12px',
    base: '14px',
    xl: '16px',
    xxl: '18px',
  },
  borderRadius: '6px',
  animationTime: '0.3s',
  border: '1px solid #CACFD2',
};
