/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 50px auto;
`;

export const PageTitle = styled.h1`
  color: #444;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 35px;
`;

export const ProblemsTable = styled.table`
  width: 100%;
  border-spacing: 0 20px;

  thead th {
    color: #444;
    font-size: 16px;
    text-align: left;
    padding: 0 12px;
  }

  thead th:last-of-type {
    text-align: right;
  }

  tbody td:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  tbody td:last-of-type {
    border-radius: 0 4px 4px 0;
    text-align: right;
  }

  tbody td {
    background: #fff;
    padding: 12px;

    > div {
      display: flex;
      align-items: center;
    }

    span {
      color: #666;
      font-size: 16px;
    }
  }
`;
