import React from 'react';

import { Container } from './styles';

const MessageError: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default MessageError;