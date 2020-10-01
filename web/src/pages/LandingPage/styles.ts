import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  header {
    display: flex;
    justify-content: center;
    background-color: ${ ({ theme }) => theme.primary.main};
  }

  main {
    display: flex;
    justify-content: center;
  }
`;

export const HeaderContent = styled.div`
  margin: 1.4rem 2rem;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: ${ ({ theme }) => theme.text.inPrimaryBase};

  @media (min-width: 1100px) {
    max-width: 1200px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const UserButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.8rem;
  transition: background-color .2s;
  color: inherit;

  &:hover {
    background-color: ${ ({ theme }) => theme.primary.dark};
  }

  div {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    
    img {
      width: auto;
      height: 100%;
    }
  }

  p {
      font-size: 1.4rem;
      line-height: 3rem;
      font-weight: 500;
      margin-left: 1.6rem;
    }

`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: min-content;
  height: min-content;
  padding: 1rem;
  border-radius: 0.8rem;
  transition: background-color .2s;

  &:hover {
    background-color: ${ ({ theme }) => theme.primary.dark};
  }
`;

export const Images = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3.6rem 0;

  @media (min-width: 1100px) {
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;

  h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
  }

  img{
    height: 8rem;
  }

  @media (min-width: 1100px) {
    width: min-content;
    margin-right: 6rem;
    text-align: left;

    img {
      width: 45rem;
      height: auto;
    }

    h2 {
    font-size: 3.3rem;
    text-align: left;
    line-height: 6rem;
  }
  }

`;

export const HeroImage = styled.img`
  width: 100%;
  max-width: 50rem;

  @media (min-width: 1100px) {
    max-width: 70rem;
  }
`;

export const MainContent = styled.div`
  padding: 5.6rem 2rem 0 2rem;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 1100px) {
    flex-direction: row;
    max-width: 1200px;
  }
`;

export const Descriptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1100px) {
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 5rem;
  }
  
  h3 {
    font-size: 2.4rem;
    font-weight: 400;
    color: ${ ({ theme }) => theme.text.base };

    span {
      font-weight: 600;
    }
  }
`;

export const TotalConnections = styled.span`
  color: ${ ({ theme }) => theme.text.complement };
  margin-top: 3.2rem;

  img {
    margin-left: 1.2rem;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3.2rem;

  @media (min-width: 1100px) {
    width: 50%;
  }

  a {
    width: 100%;
    max-width: 30rem;
    height: 10.4rem;
    border-radius: 0.8rem;
    font: 700 2.4rem Archivo;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: ${ ({ theme }) => theme.text.inPrimaryTitle };

    transition: background-color .2s;

    img {
      width: 4rem;
      margin-right: 2.4rem;
    }
  }

  a:first-child {
    margin-right: 1.6rem;
  }

  a.study {
    background: ${ ({ theme }) => theme.primary.main};

    &:hover {
      background: ${ ({ theme }) => theme.primary.light};
    }
  }

  a.give-classes {
    background: ${ ({ theme }) => theme.secondary.main};

    a.give-classes:hover {
      background: ${ ({ theme }) => theme.primary.light};
    }
  } 
`;
