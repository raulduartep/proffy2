import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

import LogoutIcon from '../../assets/images/icons/logout.svg';
import logoContainer from '../../assets/images/logo.svg';
import logoLanding from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/heart_purple.svg';
import userNotFoundImage from '../../assets/images/user_not_found.jpg';

import {
  Container,
  HeaderContent,
  ProfileContainer,
  UserButton,
  LogoutButton,
  Images,
  Logo,
  HeroImage,
  MainContent,
  Descriptions,
  TotalConnections,
  Buttons
} from './styles';

const LandingPage: React.FC = () => {

  const authContext = useContext(AuthContext)

  const [isTeacher, setIsTeacher] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState('');
  const [totalConnections, setTotalConnections] = useState(0);
  const { signOut, api } = authContext;

  useEffect(() => {

    (async () => {
      const responseTeacher = await api.get(`/classes`);

      if (responseTeacher && responseTeacher.data) {
        const responseUser = await api.get('/users');

        if (responseUser && responseUser.data) {
          const dataUser = responseUser.data;
          const dataTeacher = responseTeacher.data;

          setName(dataUser.name)
          setLastName(dataUser.last_name)

          setIsTeacher(true)
          setAvatar(dataTeacher.avatar)
        }
      }

      const responseConnections = await api.get('connections');

      if (responseConnections && responseConnections.data) {
        const dataConnections = responseConnections.data;

        setTotalConnections(dataConnections.total)
      }
    })()
  }, [api])

  return (
    <Container>
      <header>
        <HeaderContent>
          <ProfileContainer>
            {
              isTeacher && (
                <UserButton to='/profile'>
                  <div>
                    <img
                      src={
                        avatar
                          ? `http://localhost:3333/images/${avatar}`
                          : userNotFoundImage
                      }
                      alt={`${name} ${last_name}`} />
                  </div>
                  <p>{`${name} ${last_name}`}</p>
                </UserButton>
              )
            }
            <LogoutButton onClick={signOut}>
              <img src={LogoutIcon} alt="Sair" />
            </LogoutButton>
          </ProfileContainer>
          <Images>
            <Logo>
              <img src={logoContainer} alt="Proffy" />
              <h2>Sua plataforma de estudos online</h2>
            </Logo>
            <HeroImage
              src={logoLanding}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </Images>
        </HeaderContent>
      </header>
      <main>
        <MainContent>
          <Descriptions>
            <h3>Seja bem-vindo.<br /><span>O que deseja fazer?</span></h3>
            <TotalConnections>
              {totalConnections === 1 ? `${totalConnections} conexão já realizada` : `${totalConnections} conexões já realizadas`}
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </TotalConnections>
          </Descriptions>
          <Buttons>
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>
            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar aulas" />
              Dar aulas
            </Link>
          </Buttons>
        </MainContent>
      </main>
    </Container>
  );
}

export default LandingPage;