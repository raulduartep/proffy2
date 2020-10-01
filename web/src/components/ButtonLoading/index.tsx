import React from 'react';
import ReactLoading from 'react-loading';

import Button, { ButtonAttributes } from '../Button';

interface ButtonLoadingProps extends ButtonAttributes {
  loading: boolean;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({children, className, loading, ...rest}) => {
  return (
    <Button className={className}>
      {
        loading
          ? <ReactLoading 
            height='1.6rem'
            width='1.6rem'
            type='bubbles'
          />
          : children
      }
    </Button>
  );
}

export default ButtonLoading;