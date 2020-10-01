import styled from 'styled-components';

interface Props {
  error: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${ ({ theme }) => theme.primary.main };
  color: ${ ({ theme }) => theme.text.inPrimaryTitle};

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    img {
      margin-bottom: 4rem;
    }

    h1 {
      font-size: 5.4rem;
      font-weight: bold;
      line-height: 6rem;
      margin-bottom: 2.4rem;
      text-align: center;

      @media (min-width: 520px) {
        line-height: 4.2rem;
      }
    }

    h3 {
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 2.6rem;
      max-width: 400px;
      text-align: center;
    }

    a {
      margin-top: 8rem;
      padding: 1.5rem 4rem;
      cursor: pointer;
      color: ${ ({ theme }) => theme.shape.active };
      background-color: ${ ({ theme, error }) => error ? theme.delete.main : theme.secondary.main };
      font-weight: 500;
      font-size: 1.6rem;
      border-radius: 0.8rem;
      transition: background-color .2s;
    }

    a:hover {
      background-color: ${ ({ theme, error }) => error ? theme.delete.dark : theme.secondary.dark };
    }

  }
`;


export const BackgroundImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 8rem;
    display: none;

  @media (min-width: 1100px) {
    display: block;
  }
`;

