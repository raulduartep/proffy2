import React, { useState, InputHTMLAttributes, useRef, useLayoutEffect, } from 'react';

import ShowPasswordIcon from '../../assets/images/icons/show_password.svg';
import HiddenPasswordIcon from '../../assets/images/icons/hidden_password.svg';

import { Container, Input, Label, ButtonHidden } from './styles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  name: string,
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  className,
  type = 'text',
  value,
  ...rest
}) => {

  const [empty, setEmpty] = useState(true);
  const [hidden, setHidden] = useState(type === 'password');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (String(value).length !== 0) {
      setEmpty(false)
      
    } else {
      setEmpty(true)
    }
  }, [value])

  function handleToggleHidden() {
    setHidden(!hidden)
  }

  return (
    <Container className={className}>
      <div>
        <Input
          ref={inputRef}
          name={name}
          type={
            !hidden
              ? type === 'password'
                ? 'text'
                : type
              : 'password'
          }
          empty={empty}
          value={value}
          {...rest}
        />
        <Label htmlFor={name}>
          {label}
        </Label>
      </div>
      {type === 'password' && (
        <ButtonHidden onClick={handleToggleHidden} type="button">
          {
            hidden
              ? <img src={ShowPasswordIcon} alt='Mostrar senha' />
              : <img src={HiddenPasswordIcon} alt='Esconder senha' />
          }
        </ButtonHidden>
      )}
    </Container>
  );
}

export default TextField;