import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

import { registerDeliverymanRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import history from '~/services/history';

import {
  Container,
  UpperWrapper,
  ButtonContainer,
  FormContainer,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('o nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  avatar_id: Yup.number(),
});

export default function DeliverymansRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    console.tron.log(data);
    dispatch(registerDeliverymanRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <UpperWrapper>
          <h1>Cadastro de entregadores</h1>
          <ButtonContainer>
            <button type="button" onClick={() => history.push('/deliverymans')}>
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
          <AvatarInput />
          <strong>Nome</strong>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do entregador"
          />
          <strong>Email</strong>
          <Input
            type="emaiL"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </FormContainer>
      </Form>
    </Container>
  );
}
