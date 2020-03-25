import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

export function* registerDeliveryman({ payload }) {
  try {
    yield call(api.post, 'deliverymans', payload.data);

    toast.success('Cadastro realizado com sucesso!');
    history.push('/deliverymans');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
  }
}

export function* registerRecipient({ payload }) {
  try {
    yield call(api.post, 'recipients', payload.data);

    toast.success('Cadastro realizado com sucesso!');
    history.push('/recipients');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
  }
}

export function* registerOrder({ payload }) {
  try {
    yield call(api.post, 'delivery', payload.data);

    toast.success('Cadastro realizado com sucesso!');
    history.push('/orders');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
  }
}

export function* editDeliveryman({ payload }) {
  try {
    yield call(api.put, `deliverymans/${payload.data.id}`, payload.data);

    toast.success('Edição realizada com sucesso!');
    history.push('/deliverymans');
  } catch (err) {
    toast.error('Falha na edição, verifique seus dados!');
  }
}

export default all([
  takeLatest('@user/REGISTER_DELIVERYMAN_REQUEST', registerDeliveryman),
  takeLatest('@user/REGISTER_RECIPIENT_REQUEST', registerRecipient),
  takeLatest('@user/REGISTER_ORDER_REQUEST', registerOrder),
  takeLatest('@user/EDIT_DELIVERYMAN_REQUEST', editDeliveryman),
]);
