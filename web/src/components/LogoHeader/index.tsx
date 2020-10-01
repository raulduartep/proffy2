import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import backgroundImg from '../../assets/images/background.svg'

import { Container, BackgroundImg } from './styles';

const LogoHeader: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={logoImg} alt='Proffy' />
        <h2>Sua plataforma de estudos online</h2>
      </div>
      <BackgroundImg src={backgroundImg} alt='Fundo'/>
    </Container>
  );
}

export default LogoHeader;