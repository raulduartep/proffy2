import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    font-size: 60%;
    overflow-x: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
      background: ${({ theme }) => theme.background};
      -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea, pre {
      font: 500 1.6rem Poppins;
      color: ${({ theme }) => theme.text.base};
      outline: 0;
      border: 0;
  }

  button {
      cursor: pointer;
      background: none;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text.complement};
  }

  @media (min-width: 700px) {
    :root {
        font-size: 62.5%;
    }
}
`;