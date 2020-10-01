import styled from 'styled-components';

export const Container = styled.div`
  main {
    margin: 0 1.6rem;
    padding: 3.2rem 0;
    
    > div {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
    } 
  }
`;

export const Header = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  
  form {
    margin-top: 3.2rem;
    display: flex;
    flex-direction: column;

    label {
      color: ${ ({ theme }) => theme.text.inPrimaryTitle };
    }

    > button {
      height: 5.6rem;
      background: ${ ({ theme }) => theme.secondary.main };
      color: ${ ({ theme }) => theme.text.inPrimaryTitle };
      border: 0;
      padding: 0 1.6rem;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.4rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 3.2rem;

      &:hover {
        background: ${ ({ theme }) => theme.secondary.dark };
      }
    }
  }

  @media (min-width: 700px) {
    form {
        flex-direction: row;
        align-items: flex-end;
        position: absolute;
        bottom: -9.2rem;
        width: 100%;
    }

    form .input-block,
    form > button {
      margin-top: 0;
    }

    form .input-block + .input-block,
    form > button {
      margin-left: 1.6rem;
    }

    .little-input {
      max-width: 13rem;
    }
  }

`;

export const ContainerTitle = styled.div`
  margin-top: 6.4rem;
  display: flex;
  align-items: center;

  h2 {
    color: ${ ({ theme }) => theme.text.inPrimaryTitle };
    font-family: Archivo;
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 2.4rem;
  }

  div {
    width: 50%;
  }
`;

export const Emoji = styled.div`
  display: flex;
  justify-content: flex-end;

  p {
    color: ${ ({ theme }) => theme.text.inPrimaryBase };
    font-size: 1.2rem;
    margin-left: 2.4rem;
  }
`;

export const NoClasses = styled.h3`
  margin: 12rem auto 0 auto;
  font-size: 1.6rem;
  color: ${ ({ theme }) => theme.text.complement };
  font-weight: 400;
  text-align: center;
  line-height: 2.6rem;
  width: 26rem;
`