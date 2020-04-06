/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { darken } from 'polished';

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

export const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  position: relative;

  form {
    display: flex;

    button {
      background: none;
      border: 0;
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 999;
    }
    input {
      background: #fff;
      color: #999;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 36px;
      width: 237px;
      padding: 0 30px;

      &::placeholder {
        color: #999;
      }
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 300px;
    > button:last-child {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background: #7d40e7;
      border-radius: 4px;
      width: 142px;
      height: 36px;
      border: 0;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }

      span {
        color: #fff;
        font-weight: bold;
      }
    }
  }
`;

export const OrdersTable = styled.table`
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

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
`;

export const Status = styled.strong`
  color: ${props =>
    props.status === 'CANCELADA'
      ? '#DE3B3B'
      : props.status === 'ENTREGUE'
      ? '#2CA42B'
      : props.status === 'RETIRADA'
      ? '#4D85EE'
      : '#C1BC35'};
  background: ${props =>
    props.status === 'CANCELADA'
      ? '#FAB0B0'
      : props.status === 'ENTREGUE'
      ? '#DFF0DF'
      : props.status === 'RETIRADA'
      ? '#BAD2FF'
      : '#F0F0DF'};
  font-size: 14px;
  padding: 5px 5px 5px 20px;
  border-radius: 12px;
  position: relative;

  &::before {
    position: absolute;
    top: 7px;
    left: 5px;
    width: 12px;
    height: 12px;
    background: ${props =>
      props.status === 'CANCELADA'
        ? '#DE3B3B'
        : props.status === 'ENTREGUE'
        ? '#2CA42B'
        : props.status === 'RETIRADA'
        ? '#4D85EE'
        : '#C1BC35'};
    content: '';
    border-radius: 50%;
  }
`;

export const Pagination = styled.footer`
  width: 500px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: calc(50% - 250px);
  bottom: 8%;

  button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #7d40e7;
    border-radius: 4px;
    width: 142px;
    height: 36px;
    border: 0;
    cursor: pointer;
    transition: background 0.2s;

    div {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    span {
      color: #fff;
      font-weight: bold;
    }

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;

export const ProblemButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${props => (props.problems ? '#2CA42B' : '#DE3B3B')};
  border-radius: 4px;
  width: 142px;
  height: 36px;
  border: 0;
  cursor: pointer;
  transition: background 0.2s;

  div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  span {
    color: #fff;
    font-weight: bold;
  }
`;
