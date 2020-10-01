import styled from 'styled-components';

import Background from "../../assets/images/background_profile.svg";

export const Container = styled.div`
  width:  100%;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    display: none;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background: url(${Background});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center; 
  }

  @media (min-width: 1100px) {
    max-width: 1200px;

    &::before {
      display: block;
    }
  }
`;

export const ProfileProps = styled.div`
  margin: 6.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: min-content;
`;

export const ProfileImage = styled.div<{ image: string }>`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  overflow: hidden;
  background-image: url("${({ image }) => image}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

export const BadgeButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 50%;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: ${({ theme }) => theme.secondary.main};

  &:hover {
    background-color: ${({ theme }) => theme.secondary.dark};
  }
`;

export const ProfileName = styled.p`
  font-family: Archivo;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 3.6rem;
  color:${({ theme }) => theme.text.inPrimaryTitle};
  margin-top: 3.2rem;
  text-align: center;
`;

export const ProfileWorkspace = styled.p`
  font-size: 2.4rem;
  line-height: 2.6rem;
  color:${({ theme }) => theme.text.inPrimaryBase};
  margin-top: 1.6rem;
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  @media (min-width: 700px) {
    flex-direction: row;

    div + div {
      margin-left: 3.2rem
    }
  }
`;

export const FormContainer = styled.form`
  background: ${({ theme }) => theme.shape.active};
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  padding-top: 6.4rem;
  margin: -6.4rem auto ;
  overflow: hidden;

  fieldset + fieldset {
      margin-top: 6.4rem;
    }

  fieldset {
    border: 0;
    padding: 0 6.4rem;

    legend {
      font: 700 2.4rem Archivo;
      color: ${({ theme }) => theme.text.title};
      margin-bottom: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid ${({ theme }) => theme.back.linesInWhite};
      
      button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.primary.main};;
        font: 700 1.6rem Archivo;
        cursor: pointer;
        transition: color 0.2s;
      }

      button:hover {
        color: ${({ theme }) => theme.primary.dark};
      }

    }

  }
  
  footer {
    padding: 4rem 2.4rem;
    background: ${({ theme }) => theme.shape.normal};
    border-top: 1px solid ${({ theme }) => theme.back.linesInWhite};
    margin-top: 6.4rem;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: ${({ theme }) => theme.text.complement};

      img {
        margin-right: 2rem;
      }
    }

    button {
      width: 100%;
      height: 5.6rem;
      background: ${({ theme }) => theme.secondary.main};
      color: ${({ theme }) => theme.shape.active};
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.6rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 3.2rem;

      &:hover {
        background: ${({ theme }) => theme.secondary.dark};
      }
    }
  }

  @media (min-width: 700px) {
    .little-input {
      max-width: 20rem;
    }

    footer {
        padding: 4.0rem 6.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    footer p {
        justify-content: space-between;
    }

    footer button {
        width: 20rem;
        margin-top: 0;
    }
  }

`;

export const ScheduleItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.back.linesInWhite};
  padding-bottom: 2.4rem;
  margin: 1.2rem;
  position: relative;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  } 

  > button {
    position: absolute;
    bottom: -7px;
    left: calc(50% - 75px);
    width: 150px;
    color: ${({ theme }) => theme.delete};
    font-family: Archivo;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.shape.active};
  }

  @media (min-width: 700px) {
    > div {
      flex-direction: row;
    }

    div + div {
      margin-left: 3.2rem
    }

    .tiny-input {
      max-width: 12rem;
    }
  }
`;

export const EmptyScheduleItems = styled.p`
  text-align: center;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.text.complement};
`
