/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaEllipsisH } from 'react-icons/fa';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, Badge, MenuList, MenuItem } from './styles';

import api from '~/services/api';

export default function DropMenu({ recipientId, updateRecipients }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    const deleteConfirm = confirm(
      'Deseja realmente deletar esse destinatário ?'
    );

    if (deleteConfirm === true) {
      await api.delete(`recipients/${recipientId}`);
      updateRecipients();
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
          <Link to={`/recipients/edit/${recipientId}`}>
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
  recipientId: PropTypes.number.isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
