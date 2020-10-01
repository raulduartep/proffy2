import styled from 'styled-components';
import Button from '../../components/ButtonLoading';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  main {
    display: flex;
    justify-content: center;
    height: 80%;

    @media (min-width: 1100px) {
      height: 100%;
      width: 50%;
    } 
  }

  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 350px;
  display: grid;
  height: 100%;
  grid-template-rows: auto min-content;
  padding: 4rem 0;

  footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

`;

export const Complement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  font-size: 1.4rem;
  color: ${ ({ theme }) => theme.text.complement};

  > div {
    display: flex;
    align-items: center;

    button {
      margin-right: 1.6rem;
    }
  }
`;

export const Register = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;

  > p {
    color: ${ ({ theme }) => theme.text.base};
    font-size: 1.6rem;
  }

  > a {
    font-weight: 600;
    text-decoration: underline;
    color: ${ ({ theme }) => theme.primary.main}
  }
`


export const Heart = styled.p`
  color: ${ ({ theme }) => theme.text.complement};
  font-size: 1.2rem;

  img {
    margin-left: 0.8rem;
  }
`;

export const Form = styled.form`
  width: 100%;
  align-self: center;

  header {
    text-align: center;
    margin-bottom: 4rem;

    > h2{
      font-size: 3.6rem;
      font-weight: 600;
      color: ${ ({ theme }) => theme.text.title};
      line-height: 4.6rem;
    }
  }

  @media (min-width: 1100px) {
    header {
    text-align: initial;
    }
  }
`;

export const Inputs = styled.div`
  div:first-child {
    border-radius: 0.8rem 0.8rem 0 0;
  }

  div:last-child {
    border-radius: 0 0 0.8rem 0.8rem;
  }
`

export const ButtonForm = styled(Button)`
  margin-top: 4rem;
`