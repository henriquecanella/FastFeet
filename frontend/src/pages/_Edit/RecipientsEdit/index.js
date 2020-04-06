/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

import Mask from './Mask';

import history from '~/services/history';
import api from '~/services/api';

import { editRecipientRequest } from '~/store/modules/user/actions';

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
  cep: Yup.string()
    .test(
      'cep-length',
      // eslint-disable-next-line no-template-curly-in-string
      'O ${path} deve possuir 8 caracteres',
      value => (value ? value.indexOf('_') === -1 : value === null)
    )
    .typeError('O cep é obrigatório')
    .required('O cep é obrigatório'),
});

export default function RecipientsEdit({ match }) {
  const dispatch = useDispatch();

  const [recipients, setRecipients] = useState([]);
  const [q] = useState('');

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { q },
      });

      const selectedRecipient = response.data.filter(recipient => {
        recipient.cep = `${recipient.cep
          .toString()
          .slice(0, 5)}-${recipient.cep.toString().slice(5)}`;

        return recipient.id === parseInt(match.params.id);
      }, []);

      setRecipients(selectedRecipient[0]);
    }
    loadRecipient();
  }, [match.params, q]);

  function handleSubmit(data) {
    data.cep = parseInt(data.cep.replace('-', ''));
    data = {
      ...data,
      id: recipients.id,
    };
    dispatch(editRecipientRequest(data));
  }

  return (
    <Container>
      <Form initialData={recipients} onSubmit={handleSubmit} schema={schema}>
        <UpperWrapper>
          <h1>Edição de destinatários</h1>
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
              <Mask
                name="cep"
                mask="99999-999"
                maskChar="_"
                placeholder="Ex: 00000-000"
              />
            </div>
          </CityContainer>
        </FormContainer>
      </Form>
    </Container>
  );
}

RecipientsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
