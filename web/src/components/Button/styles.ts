import styled, { css } from 'styled-components';
import { ButtonProps } from './index';

export const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  font-family: Archivo, Poppins, sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 0.8rem;
  width: 100%;
  transition: background-color .2s;

  ${ ({ disabled }) => disabled
  ? css`
    cursor: default;
    background-color: ${ ({ theme }) => theme.shape.disabled };
    color: ${ ({ theme }) => theme.text.complement };
  `
  : css `
    cursor: pointer;
    color: ${ ({ theme }) => theme.shape.active };
    background-color: ${ ({ theme }) => theme.secondary.main };

    &:hover {
      background-color: ${ ({ theme }) => theme.secondary.dark }
    }
  `
  }

`