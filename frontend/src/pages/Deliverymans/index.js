/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  PageTitle,
  UpperWrapper,
  DeliverymansTable,
  Pagination,
} from './styles';

import DropMenu from './dropmenu';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  function handleSubmit({ filter }) {
    setQ(filter);
  }

  function handleUpdateDeliverymans() {
    setQ(' ');
    setQ('');
  }

  function handlePreviousPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }
  function handleNextPage() {
    setPage(page + 1);
  }

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliverymans', {
        params: { q, page },
      });

      setDeliverymans(response.data);
    }
    loadDeliveryman();
  }, [page, q]);

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
        <button
          type="button"
          onClick={() => {
            history.push('/deliverymans/register');
          }}
        >
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
            <tr key={deliveryman.id}>
              <td>
                <span>{`#${deliveryman.id}`}</span>
              </td>
              <td>
                <img
                  src={
                    deliveryman.avatar === null
                      ? 'https://api.adorable.io/avatars/50/abott@adorable.png'
                      : deliveryman.avatar.url
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
      <Pagination>
        <button type="button" onClick={() => handlePreviousPage()}>
          <div>
            <IoIosArrowBack color="#FFF" size={20} />
            <span>Página anterior</span>
          </div>
        </button>
        <button type="button" onClick={() => handleNextPage()}>
          <div>
            <span>Próxima Página</span>
            <IoIosArrowForward color="#FFF" size={20} />
          </div>
        </button>
      </Pagination>
    </Container>
  );
}
