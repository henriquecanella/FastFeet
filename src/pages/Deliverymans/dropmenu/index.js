/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Badge, MenuList, MenuItem } from './styles';

import api from '~/services/api';

export default function DropMenu({ deliverymanId, updateDeliverymans }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    const deleteConfirm = confirm('Deseja realmente deletar esse entregador ?');

    if (deleteConfirm === true) {
      await api.delete(`deliverymans/${deliverymanId}`);
      updateDeliverymans();
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
          <Link to={`/deliverymans/edit/${deliverymanId}`}>
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
    </Container>
  );
}

DropMenu.propTypes = {
  deliverymanId: PropTypes.number.isRequired,
  updateDeliverymans: PropTypes.func.isRequired,
};
