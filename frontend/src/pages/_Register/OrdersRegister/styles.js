import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
`;

export const UpperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    color: #444;
    font-size: 24px;
    font-weight: bold;
  }
`;
export const ButtonContainer = styled.div`
  button {
    border-radius: 4px;
    width: 142px;
    height: 36px;
    border: 0;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin: 0 8px;
    transition: background 0.2s;

    div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    &:first-of-type {
      background: #cccccc;

      &:hover {
        background: ${darken(0.03, '#cccccc')};
      }
    }

    &:last-of-type {
      background: #7d40e7;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
export const FormContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  strong {
    color: #444;
    font-size: 14px;
    margin-bottom: 8px;
  }

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 45px;
    padding: 0 15px;
    margin: 0 0 15px;
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
