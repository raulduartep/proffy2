import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${ ({ theme }) => theme.primary.main };
  color: ${  ({ theme }) => theme.text.inPrimaryBase};
  width: 100%;
  height: 20%;
  min-height: 300px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 30rem;

    img {
      width: 100%;
    }

    h2 {
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 4.6rem;
      margin-top: 0.8rem;
    }
  }

  @media (min-width: 1100px) {
    width: 50%;
    height: 100%;
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

