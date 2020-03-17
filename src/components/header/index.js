import React from 'react';
import { Link } from 'react-router-dom';
import history from '~/services/history';

import { Container, Content, Profile, StyledLink } from './styles';

import logo from '~/assets/fastfeet-header.svg';

export default function header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo FastFeet" />
          <StyledLink
            iscurrent={history.location.pathname === '/orders'}
            to="/orders"
          >
            ENCOMENDAS
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname === '/deliverymans'}
            to="/deliverymans"
          >
            ENTREGADORES
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname === '/recipients'}
            to="/recipients"
          >
            DESTINATÁRIOS
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname === '/problems'}
            to="/problems"
          >
            PROBLEMAS
          </StyledLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admin FastFeet</strong>
              <Link to="/">sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
