import styled, { css } from 'styled-components';
import { Rect } from './index';

interface ContainerSeletProps {
  readonly isOpen: boolean;
  readonly rectMenu: Rect | null;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  
  label {
    font-size: 1.4rem;
    pointer-events: none;
  }
`;

export const Text = styled.p`
  color: ${ ({ theme }) => theme.text.base };
`;

export const Placeholder = styled.p`
  color: ${ ({ theme }) => theme.text.input };
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 5.6rem;
  margin-top: 0.8rem;
  background: ${ ({ theme }) => theme.shape.normal };
  border: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
  outline: 0;
  padding: 0 2.4rem;
  font-size: 1.6rem;
  cursor: pointer;

`;

export const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  left: 0;
  top: 0;
`;

export const Menu = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${ ({ theme }) => theme.shape.normal };
  border-left: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
  border-right: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
  border-bottom: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
  max-height: 300px;
  overflow-y: auto;
`;

export const Option = styled.li`
  list-style: none;
  padding: 1.5rem 2.4rem;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${ ({ theme }) => theme.back.hover };
    font-weight: 600;
  }

  &:hover::after {
    content: '';
    position: absolute;
    background-color: ${ ({ theme }) => theme.primary.main };
    width: 1.5px;
    height: 100%;
    top: 0;
    left: 0;
    transition: height 0.1s
  }
`;

export const ContainerSelect = styled.div<ContainerSeletProps>`
  ${ ({ isOpen, rectMenu }) => isOpen 
    ? rectMenu && css`
        ${MenuContainer} {
          display: block;
        }

        ${Button} {
          border-radius: ${ rectMenu.exceedSizeOfWindow ? '0.8rem' :  '0.8rem 0.8rem 0 0'}
        }

        ${Menu} {
          top: ${rectMenu.exceedSizeOfWindow
            ? rectMenu.top - rectMenu.exceedSizeOfWindow - 20
            : rectMenu.top
          }px;
          left: ${rectMenu.left}px;
          width: ${rectMenu.width}px;
          border-radius: ${ rectMenu.exceedSizeOfWindow > 0
            ? '0.8rem'
            : '0 0 0.8rem 0.8rem'
          };
          box-shadow: ${ rectMenu.exceedSizeOfWindow > 0
            && `0px 5px 5px -3px rgba(0,0,0,0.2),
                0px 8px 10px 1px rgba(0,0,0,0.14),
                0px 3px 14px 2px rgba(0,0,0,0.12)`
          }
        }
      `
    : css`
      ${MenuContainer} {
        display: none;
      }

      ${Button} {
        border-radius: 0.8rem
      }
    `
  }

`;
