/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import api from '~/services/api';
import { Container, PageTitle, ProblemsTable, Pagination } from './styles';

import DropMenu from './dropmenu';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);

  function handlePreviousPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }
  function handleNextPage() {
    setPage(page + 1);
  }

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems', {
        params: { page },
      });

      setProblems(response.data);
    }
    loadProblems();
  }, [page]);

  return (
    <Container>
      <PageTitle>Problemas na entrega</PageTitle>

      <ProblemsTable>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>
                <span>{`#${problem.delivery_id}`}</span>
              </td>
              <td>
                <span>
                  {problem.description.length > 60
                    ? `${problem.description.substring(0, 60)}...`
                    : problem.description}
                </span>
              </td>
              <td>
                <DropMenu
                  deliveryId={problem.delivery_id}
                  problemInfo={problem.description}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </ProblemsTable>
      <Pagination>
        <button type="button" onClick={() => handlePreviousPage()}>
          <div>
            <IoIosArrowBack color="#FFF" size={20} />
            <span>Página anterior</span>
          </div>
        </button>
        <button type="button" onClick={() => handleNextPage()}>
          <div>
            <span>Próxima Página</span>
            <IoIosArrowForward color="#FFF" size={20} />
          </div>
        </button>
      </Pagination>
    </Container>
  );
}
