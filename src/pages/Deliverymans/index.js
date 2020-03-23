/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import {
  Container,
  PageTitle,
  UpperWrapper,
  DeliverymansTable,
} from './styles';

import DropMenu from './dropmenu';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [q, setQ] = useState('');

  function handleSubmit({ filter }) {
    setQ(filter);
  }

  function handleUpdateDeliverymans() {
    setQ(' ');
    setQ('');
  }

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliverymans', {
        params: { q },
      });

      setDeliverymans(response.data);
    }
    loadDeliveryman();
  }, [q]);
  console.tron.log(deliverymans);

  return (
    <Container>
      <PageTitle>Gerenciando entregadores</PageTitle>
      <UpperWrapper>
        <Form onSubmit={handleSubmit}>
          <button type="submit">
            <FaSearch size={16} color="#999" />
          </button>
          <Input
            name="filter"
            type="text"
            placeholder="Buscar por entregadores"
          />
        </Form>
        <button type="button">
          <FaPlus size={16} color="#FFF" />
          <span>CADASTRAR</span>
        </button>
      </UpperWrapper>
      <DeliverymansTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymans.map(deliveryman => (
            <tr>
              <td>
                <span>{`#${deliveryman.id}`}</span>
              </td>
              <td>
                <img
                  src={
                    deliveryman.avatar.url ||
                    'https://api.adorable.io/avatars/50/abott@adorable.png'
                  }
                  alt="Entregador Avatar"
                />
              </td>
              <td>
                <span>{deliveryman.name}</span>
              </td>
              <td>
                <span>{deliveryman.email}</span>
              </td>
              <td>
                <DropMenu
                  deliverymanId={deliveryman.id}
                  updateDeliverymans={() => {
                    handleUpdateDeliverymans();
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </DeliverymansTable>
    </Container>
  );
}
