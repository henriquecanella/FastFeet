/* eslint-disable react/jsx-no-bind */
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
  OrdersTable,
  Status,
  Pagination,
  ProblemButton,
} from './styles';

import DropMenu from './dropmenu';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [problems, setProblems] = useState(true);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  function handleSubmit({ filter }) {
    setQ(filter);
  }

  async function handleProblems() {
    setProblems(!problems);

    if (problems === true) {
      const deliveryProblems = await api.get('problems');

      const selectedDeliveries = orders.filter(order => {
        return (
          deliveryProblems.data.filter(problem => {
            return problem.delivery_id === order.payload.id;
          }).length !== 0
        );
      }, []);

      setOrders(selectedDeliveries);
    } else {
      const response = await api.get('delivery', {
        params: { q, page },
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
  }

  function handleUpdateOrders() {
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
    async function loadOrder() {
      const response = await api.get('delivery', {
        params: { q, page },
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
  }, [page, q]);

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
        <div>
          <ProblemButton
            onClick={() => {
              handleProblems();
            }}
            type="button"
            problems={problems}
          >
            <span>PROBLEMAS</span>
          </ProblemButton>
          <button
            onClick={() => {
              history.push('orders/register');
            }}
            type="button"
          >
            <FaPlus size={16} color="#FFF" />
            <span>CADASTRAR</span>
          </button>
        </div>
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
            <tr key={order.payload.id}>
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
                      order.payload.deliveryman &&
                      order.payload.deliveryman.avatar
                        ? order.payload.deliveryman.avatar.url
                        : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt="Entregador Avatar"
                  />
                  <span>
                    {order.payload.deliveryman
                      ? order.payload.deliveryman.name
                      : 'Entregador não alocado'}
                  </span>
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
