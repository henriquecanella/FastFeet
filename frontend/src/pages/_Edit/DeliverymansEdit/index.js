/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

import { editDeliverymanRequest } from '~/store/modules/user/actions';

import api from '~/services/api';

import {
  Container,
  UpperWrapper,
  ButtonContainer,
  FormContainer,
} from './styles';

import AvatarInput from './AvatarInput';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('o nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  avatar_id: Yup.number(),
});

export default function DeliverymansEdit({ match }) {
  const [deliverymans, setDeliverymans] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState();
  const [q] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(data) {
    data = {
      ...data,
      id: deliverymans.id,
    };
    dispatch(editDeliverymanRequest(data));
  }

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliverymans', {
        params: { q },
      });

      const selectedDeliveryman = response.data.filter(deliveryman => {
        return deliveryman.id === parseInt(match.params.id);
      }, []);
      setDeliverymans(selectedDeliveryman[0]);
      selectedDeliveryman[0].avatar
        ? setAvatarUrl(selectedDeliveryman[0].avatar.url)
        : null;
    }
    loadDeliveryman();
  }, [match.params, q]);

  return (
    <Container>
      <Form initialData={deliverymans} onSubmit={handleSubmit} schema={schema}>
        <UpperWrapper>
          <h1>Edição de entregadores</h1>
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
          <AvatarInput avatarUrl={avatarUrl} />
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
DeliverymansEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
