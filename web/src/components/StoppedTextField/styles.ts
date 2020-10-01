import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  
  label {
    font-size: 1.4rem;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: ${ ({ theme }) => theme.shape.normal };
    border: 1px solid ${ ({ theme }) => theme.back.linesInWhite };
    outline: 0;
    padding: 0 2.4rem;
    font-size: 1.6rem;
  }

  &::after {
    width: 0;
    height: 2px;
    content: '';
    background: ${ ({ theme }) => theme.primary.light };
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    transition: width .1s;
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
  }
`;