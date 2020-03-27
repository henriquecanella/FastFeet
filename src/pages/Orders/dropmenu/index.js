/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';

import { FaEllipsisH, FaEye } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Badge, MenuList, MenuItem, ModalContainer } from './styles';

import api from '~/services/api';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
  content: {
    borderRadius: '4px',
    maxWidth: '900px',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function DropMenu({ orderId, updateOrders, orderInfo }) {
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
    setVisible(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    const deleteConfirm = confirm('Deseja realmente deletar essa encomenda ?');

    if (deleteConfirm === true) {
      await api.delete(`delivery/${orderId}`);
      updateOrders();
      setVisible(false);
    }
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <FaEllipsisH size={16} color="#C6C6C6" />
      </Badge>

      <MenuList visible={visible}>
        <MenuItem>
          <Link onClick={openModal}>
            <FaEye size={10} color="#8E5BE8" />
            Visualizar
          </Link>
          <Link to={`/orders/edit/${orderId}`}>
            <MdEdit size={10} color="#4D85EE" />
            Editar
          </Link>
          <Link
            onClick={() => {
              handleDelete();
            }}
          >
            <MdDeleteForever size={10} color="#DE3B3B" />
            Excluir
          </Link>
        </MenuItem>
      </MenuList>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalContainer>
          <strong>Informações da encomenda</strong>
          <p>{`${orderInfo.street}, ${orderInfo.number}${
            orderInfo.complement !== null ? `, ${orderInfo.complement}` : ''
          }`}</p>
          <p>{`${orderInfo.city} - ${orderInfo.state}`}</p>
          <p>{orderInfo.cep}</p>
          <hr />
          <strong>Datas</strong>
          <p>
            <strong>Retirada: </strong>
            <span>
              {orderInfo.start_date !== null
                ? format(parseISO(orderInfo.start_date), 'dd/MM/yyyy')
                : 'Encomenda ainda não retirada'}
            </span>
          </p>
          <p>
            <strong>Entrega: </strong>
            <span>
              {orderInfo.end_date !== null
                ? format(parseISO(orderInfo.end_date), 'dd/MM/yyyy')
                : 'Encomenda ainda não entregue'}
            </span>
          </p>
          <hr />
          <div>
            <strong>Assinatura do destinatário</strong>
            {orderInfo.signature === 'vazio' ? (
              <span>A entrega ainda não foi realizada</span>
            ) : (
              <img src={orderInfo.signature.url} alt="Assinatura de entrega" />
            )}
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

DropMenu.propTypes = {
  orderId: PropTypes.number.isRequired,
  updateOrders: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({
    street: PropTypes.string,
    number: PropTypes.number,
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    cep: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};
