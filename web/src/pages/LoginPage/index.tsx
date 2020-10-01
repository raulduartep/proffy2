import React, { useContext, useState, FormEvent, useEffect } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';

import LogoHeader from '../../components/LogoHeader';
import AnimatedTextField from '../../components/AnimatedTextField';
import AuthContext from '../../contexts/auth';
import CheckBox from '../../components/CheckBox';
import MessageError from '../../components/MessageError';

import heartIcon from '../../assets/images/icons/heart_purple.svg'

import {
  Container,
  Complement,
  Heart,
  MainContent,
  Register,
  Inputs,
  Form,
  ButtonForm
} from './styles';

const LoginPage: React.FC = () => {

  const location = useLocation()

  const { from } = location.state as any || { from: { pathname: '/' } }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedRemember, setCheckedRemember] = useState(false)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signed } = useContext(AuthContext);

  useEffect(() => {
    const login = localStorage.getItem('@ProffyAuth:login');

    if (login) {
      const { email, password } = JSON.parse(login);

      setEmail(email);
      setPassword(password);
      setCheckedRemember(true);
    }
  }, [])

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    const storageLogin = localStorage.getItem('@ProffyAuth:login')

    if (checkedRemember) {

      if (!storageLogin || JSON.parse(storageLogin).email !== email)
        localStorage.setItem(
          '@ProffyAuth:login',
          JSON.stringify({ email, password })
        )
    } else if (storageLogin) {
      localStorage.removeItem('@ProffyAuth:login')
    }

    try {
      await signIn(email, password)
    } catch (err) {
      setError('Email/Senha incorretos')
      setLoading(false)
    }

  }

  function handleCheckedRemember() {
    setCheckedRemember(!checkedRemember)
  }

  if (signed) {
    return <Redirect to={from} />
  }

  return (
    <Container>

      <LogoHeader />

      <main>
        <MainContent>
          <Form onSubmit={handleSignIn}>
            <header>
              <h2>Fazer login</h2>
            </header>

            {
              error && <MessageError>{error}</MessageError>
            }

            <Inputs>
              <AnimatedTextField
                name='email'
                label='E-mail'
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                type='email'
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
            <Complement>
              <div>
                <CheckBox
                  checked={checkedRemember}
                  onClick={handleCheckedRemember}
                />
                  Lembrar-me
                </div>
              <Link to='/forgot_password'>
                Esqueci minha senha
                </Link>
            </Complement>

            <ButtonForm type='submit' loading={loading}>Entrar</ButtonForm>
          </Form>

          <footer>
            <Register>
              <p>Não tem conta?</p>
              <Link to='/register'>
                Cadastre-se
                </Link>
            </Register>
            <Heart>
              É de graça
              <img src={heartIcon} alt='Coração roxo' />
            </Heart>
          </footer>
        </MainContent>
      </main>
    </Container>
  );
}

export default LoginPage;