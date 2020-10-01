import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${ ({ theme }) => theme.backgroundDelete };
  padding: 1.2rem 0;
  margin: 1.6rem 0;
  border-radius: 0.8rem;
  color: ${ ({ theme }) => theme.text.inPrimaryTitle };
  text-align: center;
  font-size: 1.4rem;
`;
