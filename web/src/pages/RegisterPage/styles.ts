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
  }

  @media (min-width: 1100px) {
    flex-direction: row-reverse;

    main {
      height: 100%;
      width: 50%;
    }
  }
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 350px;
  display: grid;
  height: 100%;
  grid-template-rows: min-content auto;
  padding: 4rem 0;
`;

export const HeaderContent = styled.div`
  @media (min-width: 1100px) {
    flex-grow: 1;
  }
`;


export const InputContainer = styled.div`
  div:first-child {
    border-radius: 0.8rem 0.8rem 0 0;
  }

  div:last-child {
    border-radius: 0 0 0.8rem 0.8rem;
  }
`

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

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 4rem;
  }

  @media (min-width: 1100px) {
    header {
    text-align: initial;
    }
  }
`

export const ContainerDescription = styled.div`
  > p {
    margin-top: 1.4rem;
    line-height: 2.6rem;
  }

  
  @media (min-width: 1100px) {
    justify-content: flex-start;
  }
`

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
