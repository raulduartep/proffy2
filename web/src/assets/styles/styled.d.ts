import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
      background: string,
      primary: {
        lighter: string,
        light: string,
        main: string,
        dark: string,
        darker: string,
      },
      backgroundDelete: string,
      delete: {
        main: string,
        dark: string,
      },
      secondary: {
        main: string,
        dark: string,
      }
      back: {
        linesInWhite: string,
        hover: string,
        background: string
      }
      text: {
        inPrimaryComplement: string,
        inPrimaryBase: string
        inPrimaryTitle: string
        title: string,
        complement: string,
        base: string,
        input: string
      },
      shape: {
        active: string,
        normal: string,
        disabled: string
      }
    }
}