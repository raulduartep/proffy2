import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

export interface ButtonProps {
  disabled?: boolean;
}

export interface ButtonAttributes
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

const Button: React.FC<ButtonAttributes> = ({
  className,
  disabled,
  onClick,
  children,
  ...rest 
}) => {
  return (
    <Container
        className={className}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {children}
      </Container>
  );
}

export default Button;