import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';
import AnimatedTextField from '../../components/AnimatedTextField';
import StatusPage from '../StatusPage';
import api from '../../services/publicApi';

import {
  Container,
  MainContent,
  Form,
  ContainerDescription,
  Inputs,
  ButtonForm
} from './styles';

const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { token } = useParams()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      await api.post(`/reset_password/${token}`, {
        password
      })
    } catch (err) {
      console.log(err)
      setError(err.response.data.error)
    }

    setSent(true);
    setLoading(true)
  }

  if (sent) {
    return <StatusPage
        type={error ? 'error' : 'success'}
        title={error ? 'Erro na redefinição da nova senha' : 'Senha redefinida!'}
        description={
          error
            ? error
            : 'Demos uma nova chance para você, aproveite e bons estudos.'
        }
        buttonText='Voltar ao login'
        buttonTo='/login'
      />
  }

  return (
    <Container>
      <LogoHeader />
      <main>
        <MainContent>
          <Form onSubmit={handleSubmit}>
            <header>
              <h2>Redefinição de senha</h2>
              <ContainerDescription>
                <p>Viu! Demos um jeito.</p>
              </ContainerDescription>
            </header>
            <Inputs>
              <AnimatedTextField
                name='password'
                label='Senha'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
              />
            </Inputs>
            <ButtonForm type='submit' loading={loading}>Enviar</ButtonForm>
          </Form>
        </MainContent>
      </main>
    </Container>
  );
}

export default ForgotPasswordPage;