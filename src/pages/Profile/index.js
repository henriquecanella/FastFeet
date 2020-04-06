import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Avatar, Label, Value, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const deliveryman = useSelector((state) => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri: deliveryman.avatar
            ? deliveryman.avatar.url
            : `https://api.adorable.io/avatar/50/${deliveryman.name}`,
        }}
      />
      <Label>Nome completo</Label>
      <Value>{deliveryman.name}</Value>
      <Label>Email</Label>
      <Value>{deliveryman.email}</Value>
      <Label>Data de cadastro</Label>
      <Value>{format(parseISO(deliveryman.created_at), 'dd/MM/yyyy')}</Value>
      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
