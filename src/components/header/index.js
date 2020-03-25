/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, StyledLink } from './styles';

import logo from '~/assets/fastfeet-header.svg';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo FastFeet" />
          <StyledLink
            iscurrent={history.location.pathname.includes('/orders')}
            to="/orders"
          >
            ENCOMENDAS
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname.includes('/deliverymans')}
            to="/deliverymans"
          >
            ENTREGADORES
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname.includes('/recipients')}
            to="/recipients"
          >
            DESTINATÁRIOS
          </StyledLink>
          <StyledLink
            iscurrent={history.location.pathname.includes('/problems')}
            to="/problems"
          >
            PROBLEMAS
          </StyledLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link onClick={handleSignOut}>sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
