import React, { useState, useLayoutEffect, useRef, useCallback, InputHTMLAttributes, useEffect } from 'react';

import DownIcon from '../../assets/images/icons/arrow_down.svg';

import {
  Container,
  ContainerSelect,
  Button,
  Text,
  Placeholder,
  MenuContainer,
  Menu,
  Option
} from './styles';

interface UniqueOption {
  value: string;
  label: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  onChangeValue?: ((text: string) => void);
  options: Array<UniqueOption>;
}

export interface Rect {
  width: number,
  top: number,
  left: number,
  exceedSizeOfWindow: number
}

const getDimensions = (element: Element) => element.getBoundingClientRect();


const Select: React.FC<SelectProps> = ({ label, options, value, className, onChangeValue }) => {

  const [ menuIsOpen, setMenuIsOpen ] = useState(false);
  const [ menuRect, setMenuRect ] = useState<Rect | null>(null);
  const [ optionSelect, setOptionSelect ] = useState<UniqueOption | null>(null);

  const refButton = useRef<HTMLButtonElement>(null);
  const refMenu = useRef<HTMLUListElement>(null);

  const calcRect = useCallback(() => {

    const button = refButton.current;
    const menu = refMenu.current;

    if(button && menu) {

      const buttonRect = getDimensions(button);
      const menuRect = getDimensions(menu);

      const width = buttonRect.width;
      const top = buttonRect.top + buttonRect.height;
      const left = buttonRect.left;
      const exceedSizeOfWindow = Math.max(0, top + menuRect.height - window.innerHeight)

      setMenuRect({
        width,
        top,
        left,
        exceedSizeOfWindow
      })

    }


  }, [setMenuRect])

  function handleMenuClose() {
    setMenuIsOpen(false)
  }

  function handleMenuOpen() {
    setMenuIsOpen(true)
  }

  function handleText(option: UniqueOption) {
    setOptionSelect(option)

    if(onChangeValue) 
      onChangeValue(option.value)
  }

  useLayoutEffect(() => {
    if (menuIsOpen) {
      const updateDimensions = () => {
        window.requestAnimationFrame(() => {
          calcRect();
        });
      };

      updateDimensions();

      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [calcRect, menuIsOpen]);

  useEffect(() => {
    if(value) {
      const optionFind = options.find(option => option.value === value);
      setOptionSelect(optionFind ? optionFind : null)
      return
    }

    setOptionSelect(null)
  }, [value, options])

  return (
    <Container className={className}>
      <label>{label}</label>
      <ContainerSelect isOpen={menuIsOpen} rectMenu={menuRect}>
        <Button
          ref={refButton}
          type='button'
          onClick={handleMenuOpen}
        >
          {
            optionSelect
            ? (
              <Text>
                { optionSelect.label }
              </Text>
            )
            : (
              <Placeholder>
                Selecione a opção
              </Placeholder>
            )
          }
          <img src={DownIcon} alt="Icone de descer" />
        </Button>
        <MenuContainer onClick={handleMenuClose}>
          <Menu ref={refMenu}>
            {
              options.map((option, index) => (
                <Option key={index} onClick={() => handleText(option)}>{option.label}</Option>
              ))
            }
          </Menu>
        </MenuContainer>
      </ContainerSelect>
    </Container>
  );;
}

export default Select;
