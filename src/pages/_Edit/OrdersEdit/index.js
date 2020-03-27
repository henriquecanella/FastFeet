/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import AsyncSelectInput from './AsyncSelectInput';

import api from '~/services/api';

import { editOrderRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

import {
  Container,
  UpperWrapper,
  ButtonContainer,
  FormContainer,
  SelectContainer,
} from './styles';

export default function OrdersEdit({ match }) {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [q] = useState('');

  useEffect(() => {
    async function loadOrder() {
      const response = await api.get('delivery', {
        params: { q },
      });

      const selectedOrder = response.data.filter(order => {
        return order.id === parseInt(match.params.id);
      }, []);
      setOrders({
        product: selectedOrder[0].product,
        recipient: {
          label: selectedOrder[0].recipient.name,
          value: selectedOrder[0].recipient.id,
        },
        deliveryman: {
          label: selectedOrder[0].deliveryman
            ? selectedOrder[0].deliveryman.name
            : 'Entregador não alocado',
          value: selectedOrder[0].deliveryman
            ? selectedOrder[0].deliveryman.id
            : null,
        },
      });
    }
    loadOrder();
  }, [match.params.id, q]);

  async function loadRecipientOptions(inputValue, callback) {
    const response = await api.get('/recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(recipient => ({
      value: recipient.id,
      label: recipient.name,
    }));
    setTimeout(() => {
      callback(data);
    }, 1000);
  }

  async function loadDeliverymanOptrios(inputValue, callback) {
    const response = await api.get('/deliverymans', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));
    setTimeout(() => {
      callback(data);
    }, 1000);
  }

  function handleSubmit({ recipient_id, deliveryman_id, product }) {
    if (
      !recipient_id ||
      !deliveryman_id ||
      !product ||
      recipient_id.value === null ||
      deliveryman_id.value === null ||
      product === null
    ) {
      toast.error('Por favor preencha todos os dados!');
      return;
    }

    dispatch(
      editOrderRequest({
        id: match.params.id,
        recipient_id: recipient_id.value,
        deliveryman_id: deliveryman_id.value,
        product,
      })
    );
  }

  return (
    <Container>
      <Form initialData={orders} onSubmit={handleSubmit}>
        <UpperWrapper>
          <h1>Edição de encomendas</h1>
          <ButtonContainer>
            <button type="button" onClick={() => history.push('/orders')}>
              <div>
                <IoIosArrowBack size={16} color="#FFF" />
                <span>VOLTAR</span>
              </div>
            </button>
            <button type="submit">
              <div>
                <FaCheck size={16} color="#FFF" />
                <span>SALVAR</span>
              </div>
            </button>
          </ButtonContainer>
        </UpperWrapper>
        <FormContainer>
          <SelectContainer>
            <div>
              <AsyncSelectInput
                type="text"
                label="Destinatário"
                name="recipient_id"
                placeholder="Destinatários"
                defaultOptions
                key={orders.recipient}
                defaultValue={orders.recipient}
                loadOptions={loadRecipientOptions}
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
              />
            </div>
            <div>
              <AsyncSelectInput
                type="text"
                label="Entregador"
                name="deliveryman_id"
                placeholder="Entregadores"
                defaultOptions
                key={orders.deliveryman}
                defaultValue={orders.deliveryman}
                loadOptions={loadDeliverymanOptrios}
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
              />
            </div>
          </SelectContainer>

          <strong>Nome do produto</strong>
          <Input
            type="text"
            name="product"
            id="product"
            placeholder="Nome do produto"
          />
        </FormContainer>
      </Form>
    </Container>
  );
}

OrdersEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
