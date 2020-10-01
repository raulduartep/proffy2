import styled, { css } from "styled-components";

interface InputProps {
  readonly empty: boolean;
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${ ({ theme }) => theme.shape.active};
  border: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  &::before {
      content: '';
      position: absolute;
      z-index: 10;
      display: block;
      top: calc(15%);
      left: 0;
      width: 0px;
      height: 70%;
      border-radius: 1px;
      background-color: ${ ({ theme }) => theme.primary.main };
      transition: width .1s;
    }

  &:focus-within::before {
    width: 2px;
  }

`;

export const Input = styled.input<InputProps>`
    display: block;
    font-size: 1.6rem;
    width: 100%;
    padding: 2.4rem 2.4rem;
    position: relative;

    ${ ({ empty, theme }) => empty
      ? css`
         &:focus + label {
          font-size: 1.2rem;
          transform: translateY(-1rem);
          color: ${ theme.text.input };
        }

        &:focus  {
          padding-top: 3.4rem;
          padding-bottom: 1.4rem;
        }
      `
      : css`
        + label {
          font-size: 1.2rem;
          transform: translateY(-1rem);
        }

        padding-top: 3.4rem;
        padding-bottom: 1.4rem;

      `
    }
`;

export const Label = styled.label`
    display: block;
    position: absolute;
    font-size: 1.6rem;
    padding: 0 2.4rem;
    transition: transform .2s, font-size .2s, color .2s;
    /* transform: translate(13px, 16px); */
    pointer-events: none;
    color: ${ ({ theme }) => theme.text.complement };
    white-space: nowrap;
`;

export const ButtonHidden = styled.button`
  display: flex;
  margin-right: 2.4rem;
`;