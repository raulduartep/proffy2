import styled from 'styled-components';

interface ScheduleProps {
  readonly disabled: boolean;
}

export const Container = styled.article`
  background: ${({ theme }) => theme.shape.active};
  border: 1px solid ${({ theme }) => theme.back.linesInWhite};;
  border-radius: 0.8rem;
  margin-top: 2.4rem;
  overflow: hidden;

  header {
    padding: 3.2rem;
    display: flex;
    align-items: center;

    div:last-child {
      margin-left: 2.4rem;

      strong {
        font: 700 2.4rem Archivo;
        display: block;
        color: ${({ theme }) => theme.text.title};
      }

      span {
        font-size: 1.6rem;
        display: block;
        margin-top: 0.4rem;
      }
    }
  }

  > p {
    padding: 0 3.2rem;
    font-size: 1.6rem;
    line-height: 2.8rem;
    white-space: pre-wrap;
  }

  footer {
    padding: 3.2rem;
    background: ${({ theme }) => theme.shape.normal};
    border-top: 1px solid ${({ theme }) => theme.back.linesInWhite};
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 1.4rem;
    }

    p strong {
      font-family: Archivo;
      color: ${({ theme }) => theme.primary.dark};;
      font-size: 2.0rem;
      display: block;
    }

    a {
      width: 20rem;
      height: 5.6rem;
      background: ${({ theme }) => theme.secondary.main};
      color: ${({ theme }) => theme.text.inPrimaryTitle};;
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.4rem Archivo;
      display: flex;
      text-decoration: none;
      align-items: center;
      justify-content: space-evenly;
      transition: 0.2s;
    }

    a:hover {
      background: ${({ theme }) => theme.secondary.dark};
    }

  }

  @media (min-width: 700px) {

    header,
    footer {
      padding: 3.2rem;
    }

    > p {
      padding: 0 3.2rem;
    }

    footer {
      p strong {
        display: initial;
        margin-left: 1.6rem;
      }

      button {
        width: 24.5rem;
        font-size: 1.6rem;
        justify-content: center;

        img {
          margin-right: 1.6rem;
        }
      }
    }
  }

`;

export const Schedules = styled.ul`
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 3.2rem;
  
  li + li {
    margin-left: 1.6rem;
  }
`;

export const Schedule = styled.li<ScheduleProps>`
  
  display: flex;
  justify-content: center;
  align-items: center;

  list-style: none;
  min-width: 12rem;
  height: 12rem;
  border: 1px solid ${({ theme }) => theme.back.linesInWhite};
  background-color: ${({ theme }) => theme.shape.normal};
  border-radius: 0.8rem;
  opacity: ${({ disabled }) => disabled ? '0.4' : '1'};

  > div {  
    text-align: center;

    div + div {
      margin-top: 1.2rem;
    }

    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.text.complement};
    }

    strong {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.text.base};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
    }
  }
`;

export const Avatar = styled.div<{ image: string }>`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
  background-image: url("${({ image }) => image}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`