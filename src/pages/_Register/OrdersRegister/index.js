import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import AsyncSelectInput from './AsyncSelectInput';

import api from '~/services/api';

import { registerOrderRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

import {
  Container,
  UpperWrapper,
  ButtonContainer,
  FormContainer,
  SelectContainer,
} from './styles';

export default function OrdersRegister() {
  const dispatch = useDispatch();

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
    console.tron.log(`recipient: ${inputValue}`);
    console.tron.log(data);
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
    console.tron.log(`deliveryman: ${inputValue}`);
    console.tron.log(data);
    setTimeout(() => {
      callback(data);
    }, 1000);
  }

  function handleSubmit({ recipient_id, deliveryman_id, product }) {
    if (!recipient_id || !deliveryman_id || !product) {
      toast.error('Por favor preencha todos os dados!');
      return;
    }

    dispatch(
      registerOrderRequest({
        recipient_id: recipient_id.value,
        deliveryman_id: deliveryman_id.value,
        product,
      })
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <UpperWrapper>
          <h1>Cadastro de encomendas</h1>
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
