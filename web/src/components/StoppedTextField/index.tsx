import React, { InputHTMLAttributes } from "react";

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  name: string,
}

const Input: React.FC<InputProps> = ({ label, name, className, ...rest }) => {

  return (
    <Container className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...rest}
      />

    </Container>
  );
};

export default Input;
