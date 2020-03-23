/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import { FaEllipsisH, FaEye } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

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

export default function DropMenu({ deliveryId, problemInfo }) {
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
    const deleteConfirm = confirm('Deseja cancelar essa entrega ?');

    if (deleteConfirm === true) {
      await api.delete(`delivery/${deliveryId}/problems`);
      setVisible(false);
      toast.error('Entrega cancelada!');
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
          <Link
            onClick={() => {
              handleDelete();
            }}
          >
            <MdDeleteForever size={10} color="#DE3B3B" />
            Cancelar encomenda
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
          <strong>VISUALIZAR PROBLEMA</strong>
          <p>{problemInfo}</p>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

DropMenu.propTypes = {
  deliveryId: PropTypes.number.isRequired,
  problemInfo: PropTypes.string.isRequired,
};
