/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import {
  Container,
  PageTitle,
  UpperWrapper,
  OrdersTable,
  Status,
} from './styles';

import DropMenu from './dropmenu';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');

  function handleSubmit({ filter }) {
    setQ(filter);
  }

  function handleUpdateOrders() {
    setQ(' ');
    setQ('');
  }

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get('delivery', {
        params: { q },
      });

      const data = response.data.map(order => {
        let status = '';

        if (order.signature === null) {
          order.signature = 'vazio';
        }

        if (order.canceled_at !== null) {
          status = 'CANCELADA';
        } else if (order.start_date !== null && order.end_date !== null) {
          status = 'ENTREGUE';
        } else if (order.start_date !== null && order.end_date === null) {
          status = 'RETIRADA';
        } else if (order.start_date === null && order.end_date === null) {
          status = 'PENDENTE';
        }

        return {
          payload: order,
          status,
        };
      });

      setOrders(data);
    }
    loadOrder();
  }, [q]);

  return (
    <Container>
      <PageTitle>Gerenciando encomendas</PageTitle>
      <UpperWrapper>
        <Form onSubmit={handleSubmit}>
          <button type="submit">
            <FaSearch size={16} color="#999" />
          </button>
          <Input
            name="filter"
            type="text"
            placeholder="Buscar por encomendas"
          />
        </Form>
        <button type="button">
          <FaPlus size={16} color="#FFF" />
          <span>CADASTRAR</span>
        </button>
      </UpperWrapper>
      <OrdersTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td>
                <span>{`#${order.payload.id}`}</span>
              </td>
              <td>
                <span>{order.payload.recipient.name}</span>
              </td>
              <td>
                <div>
                  <img
                    src={
                      order.payload.deliveryman.avatar.url ||
                      'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt="Entregador Avatar"
                  />
                  <span>{order.payload.deliveryman.name}</span>
                </div>
              </td>
              <td>
                <span>{order.payload.recipient.city}</span>
              </td>
              <td>
                <span>{order.payload.recipient.state}</span>
              </td>
              <td>
                <Status status={order.status}>{order.status}</Status>
              </td>
              <td>
                <DropMenu
                  orderId={order.payload.id}
                  updateOrders={() => {
                    handleUpdateOrders();
                  }}
                  orderInfo={{
                    street: order.payload.recipient.street,
                    number: order.payload.recipient.number,
                    complement: order.payload.recipient.complement,
                    city: order.payload.recipient.city,
                    state: order.payload.recipient.state,
                    cep: order.payload.recipient.cep,
                    start_date: order.payload.start_date,
                    end_date: order.payload.end_date,
                    signature: order.payload.signature,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </Container>
  );
}
