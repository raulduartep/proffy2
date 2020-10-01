import React from "react";
import { Link } from "react-router-dom";

import backIcon from "../../assets/images/icons/back.svg";
import logoImg from "../../assets/images/logo_page_header.svg";

import {
  Container,
  TopBarContent,
  TopBarContainer,
  Content,
} from './styles';


interface PageHeaderProps {
  title?: string;
  description?: string
  namePage: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, namePage, children }) => {
  return (
    <Container>
      <TopBarContainer>
        <TopBarContent>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <h3>{namePage}</h3>
          <img src={logoImg} alt="Proffy" />
        </TopBarContent>
      </TopBarContainer>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default PageHeader;
