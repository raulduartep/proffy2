import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  background: '#F0F0F7',
  primary: {
    lighter: '#9871F5',
    light: '#916BEA',
    main: '#8257E5',
    dark: '#774DD6',
    darker: '#6842C2',
  },
  backgroundDelete: '#E33D3D60',
  delete: {
    main: '#E33D3D',
    dark: '#A82C2C',
  },
  secondary: {
    main: '#04D361',
    dark: '#04BF58',
  },
  back: {
    linesInWhite: '#E6E6F0',
    hover: '#EBEBF5',
    background: '#F0F0F7'
  },
  text: {
    inPrimaryBase: '#D4C2FF',
    inPrimaryComplement: '#A380F6',
    inPrimaryTitle: '#FFFFFF',
    title: '#32264D',
    complement: ' #9C98A6',
    base: '#6A6180',
    input: '#C1BCCC',
  },
  shape: {
    active: '#FFFFFF',
    normal: '#FAFAFC',
    disabled: '#DCDCE5'
  }
}

export default lightTheme;