import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: fixed;
    bottom: 50%;
    background: #fff;
    width: 500px;
    height: 70px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #de3b3b;
    }
  }
`;
