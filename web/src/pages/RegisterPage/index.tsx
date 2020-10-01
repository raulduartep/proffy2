import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';
import AnimatedTextField from '../../components/AnimatedTextField';
import StatusPage from '../StatusPage';
import MessageError from '../../components/MessageError';

import api from '../../services/publicApi';

import backIcon from '../../assets/images/icons/back.svg';

import {
  Container,
  MainContent,
  HeaderContent,
  Form,
  ContainerDescription,
  Inputs,
  ButtonForm
} from './styles';

const RegisterPage: React.FC = () => {

  const [registed, setRegisted] = useState(false);
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const historyRouter = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      await api.post('/users', {
        name,
        last_name,
        email,
        password
      })

      setRegisted(true);

    } catch (err) {
      setError(err.response.data.error)
    }
    setLoading(false)
  }

  if (registed) {
    return <StatusPage
      type='success'
      title='Cadastro concluído'
      description='Confirme seu email e tenha uma ótima experiência.'
      buttonText='Fazer login'
      buttonTo='/login'
    />
  }

  return (
    <Container>
      <LogoHeader />

      <main>
        <MainContent>
          <HeaderContent>
            <button onClick={historyRouter.goBack}>
              <img src={backIcon} alt="Voltar" />
            </button>
          </HeaderContent>

          <Form onSubmit={handleSubmit}>
            <header>
              <h2>Cadastro</h2>
              <ContainerDescription>
                <p>Preencha os dados abaixo para começar.</p>
              </ContainerDescription>
            </header>
            
            {error && <MessageError>{error}</MessageError>}
            
            <Inputs>
              <AnimatedTextField
                name='name'
                label='Nome'
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
              
              <AnimatedTextField
                name='last_name'
                label='Sobrenome'
                value={last_name}
                onChange={event => setLastName(event.target.value)}
                required
              />

              <AnimatedTextField
                name='email'
                label='E-mail'
                type='email'
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />

              <AnimatedTextField
                name='password'
                label='Senha'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
              />

            </Inputs>
            <ButtonForm type='submit' loading={loading}>Concluir cadastro</ButtonForm>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default RegisterPage;