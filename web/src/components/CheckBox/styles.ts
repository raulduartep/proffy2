import styled, { css } from 'styled-components';
import { FiCheck } from 'react-icons/fi'

interface CheckBoxProps {
  readonly checked: boolean
}

export const CheckedIcon = styled(FiCheck)`
  width: 14px;
  height: auto;
  transition: color .1s;
  stroke-width: 3px;
`;

export const Container = styled.button<CheckBoxProps>`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  transition: background-color .1s;

  ${ ({ checked, theme }) => checked
    ? css`
      background-color: ${ theme.secondary.main };

      ${CheckedIcon} {
        color: ${ theme.shape.active }
      }
    `
    : css`
      background-color: ${ theme.shape.active };

      ${CheckedIcon} {
        color: ${ theme.shape.disabled }
      }
    `
  }
`;