import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';
import AnimatedTextField from '../../components/AnimatedTextField';
import StatusPage from '../StatusPage';
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

const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const historyRouter = useHistory()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      await api.post('/forgot_password', {
        email
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
        title={error ? 'Erro no envio de redefinição' : 'Redefinição enviada!'}
        description={
          error
            ? error
            : 'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.'
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
          <HeaderContent>
            <button onClick={historyRouter.goBack}>
              <img src={backIcon} alt="Voltar" />
            </button>
          </HeaderContent>
          <Form onSubmit={handleSubmit}>
            <header>
              <h2>Eita, esqueceu sua senha?</h2>
              <ContainerDescription>
                <p>Não esquenta, vamos dar um geito nisso.</p>
              </ContainerDescription>
            </header>
            <Inputs>
              <AnimatedTextField
                name='email'
                label='E-mail'
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                type='email'
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