/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';
import { Container, PageTitle, UpperWrapper, RecipientsTable } from './styles';

import DropMenu from './dropmenu';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [q, setQ] = useState('');

  function handleSubmit({ filter }) {
    setQ(filter);
  }

  function handleUpdateRecipients() {
    setQ(' ');
    setQ('');
  }

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { q },
      });

      setRecipients(response.data);
    }
    loadRecipient();
  }, [q]);
  console.tron.log(recipients);

  return (
    <Container>
      <PageTitle>Gerenciando destinatarios</PageTitle>
      <UpperWrapper>
        <Form onSubmit={handleSubmit}>
          <button type="submit">
            <FaSearch size={16} color="#999" />
          </button>
          <Input
            name="filter"
            type="text"
            placeholder="Buscar por destinatários"
          />
        </Form>
        <button
          type="button"
          onClick={() => {
            history.push('recipients/register');
          }}
        >
          <FaPlus size={16} color="#FFF" />
          <span>CADASTRAR</span>
        </button>
      </UpperWrapper>
      <RecipientsTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr>
              <td>
                <span>{`#${recipient.id}`}</span>
              </td>
              <td>
                <span>{recipient.name}</span>
              </td>
              <td>
                <span>{`${recipient.street}, ${recipient.number}, ${
                  recipient.complement ? `${recipient.complement},` : ''
                } ${recipient.city} - ${recipient.state}`}</span>
              </td>
              <td>
                <DropMenu
                  recipientId={recipient.id}
                  updateRecipients={() => {
                    handleUpdateRecipients();
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </RecipientsTable>
    </Container>
  );
}
