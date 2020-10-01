import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { ThemeContext } from 'styled-components';

import backgroundSuccessImg from '../../assets/images/background_success.svg';
import backgroundErrorImg from '../../assets/images/background_error.svg';
import succesIcon from '../../assets/images/icons/success.svg';
import errorIcon from '../../assets/images/icons/error.svg';

import { Container, BackgroundImg } from './styles';

interface SuccessPageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonTo: string;
  type: 'success' | 'error';
  loading?: boolean;
}

const StatusPage: React.FC<SuccessPageProps> = ({
  title,
  description,
  buttonText,
  buttonTo,
  type,
  loading = false
}) => {

  const theme = useContext(ThemeContext);

  return (
    <Container error={type === 'error'}>
      <BackgroundImg src={type === 'success' ? backgroundSuccessImg : backgroundErrorImg} alt='Fundo' />
      {
        loading
          ? <ReactLoading
            height='10rem'
            width='10rem'
            type='spin'
            color={ theme.secondary.main }
          />
          : (<div>
            <img src={type === 'success' ? succesIcon : errorIcon} alt="ícone" />
            <h1>{title}</h1>
            <h3>{description}</h3>
            <Link to={buttonTo}>
              {buttonText}
            </Link>
          </div>)
      }
    </Container>
  );
}

export default StatusPage;