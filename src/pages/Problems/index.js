/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { Container, PageTitle, ProblemsTable } from './styles';

import DropMenu from './dropmenu';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems');

      setProblems(response.data);
    }
    loadProblems();
  }, []);
  console.tron.log(problems);

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
            <tr>
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
    </Container>
  );
}
