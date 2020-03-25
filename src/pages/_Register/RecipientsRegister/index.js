import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

import { registerRecipientRequest } from '~/store/modules/user/actions';

import history from '~/services/history';

import {
  Container,
  UpperWrapper,
  ButtonContainer,
  FormContainer,
  StreetContainer,
  CityContainer,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('o nome é obrigatório'),
  street: Yup.string().required('o nome da rua é obrigatório'),
  number: Yup.number()
    .typeError('o número da casa é obrigatório')
    .required('o número da casa é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('o nome da cidade é obrigatório'),
  state: Yup.string().required('o nome do estado é obrigatório'),
  cep: Yup.number()
    .typeError('o número do cep é obrigatório')
    .required('o número do cep é obrigatório'),
});

export default function RecipientsRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    console.tron.log(data);
    dispatch(registerRecipientRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <UpperWrapper>
          <h1>Cadastro de destinatários</h1>
          <ButtonContainer>
            <button type="button" onClick={() => history.push('/recipients')}>
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
          <strong>Nome</strong>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do destinatário"
          />
          <StreetContainer>
            <div>
              <strong>Rua</strong>
              <Input
                type="text"
                name="street"
                id="street"
                placeholder="Rua do destinatário"
              />
            </div>
            <div>
              <strong>Número</strong>
              <Input
                type="number"
                name="number"
                id="number"
                placeholder="1234"
              />
            </div>
            <div>
              <strong>Complemento</strong>
              <Input type="text" name="complement" id="complement" />
            </div>
          </StreetContainer>
          <CityContainer>
            <div>
              <strong>Cidade</strong>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Cidade do destinatário"
              />
            </div>
            <div>
              <strong>Estado</strong>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="São Paulo"
              />
            </div>
            <div>
              <strong>CEP</strong>
              <Input type="number" name="cep" id="cep" placeholder="12345678" />
            </div>
          </CityContainer>
        </FormContainer>
      </Form>
    </Container>
  );
}
