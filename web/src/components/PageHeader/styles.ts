import styled from 'styled-components';

export const Container = styled.header`
  background-color: var(--color-primary);
`;

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${ ({ theme }) => theme.primary.dark };
`;

export const TopBarContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  justify-content: space-between;
  align-items: center;
  color: ${ ({ theme }) => theme.text.inPrimaryBase };
  background-color: ${ ({ theme }) => theme.primary.dark };
  padding: 1.6rem 0;
  margin: 0 1.6rem;

  > img {
    height: 1.4rem;
  }

  h3 {
    font-family: Archivo, Poppins, sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
  }

  a {
    height: 3.2rem;
    transition: opacity 0.2s;
  }

  a:hover {
    opacity: 0.6;
  }

  @media (min-width: 1100px) {
    max-width: 1200px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${ ({ theme }) => theme.primary.main };
  padding: 0 1.6rem 6.4rem 1.6rem;
`;
