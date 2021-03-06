import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  left: 80%;
  cursor: pointer;
`;

export const MenuList = styled.div`
  z-index: 999;
  position: absolute;
  width: 150px;
  left: calc(80% - 75px);
  top: calc(100% + 5px);
  background: #fff;
  border-radius: 4px;
  display: ${props => (props.visible ? 'block' : 'none')};
  border: 1px solid #ddd;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    text-align: center;
    display: inline-block;
    color: #999999;
    font-size: 16px;
    padding: 5px;
    width: 90%;
    border-bottom: 1px solid #ddd;

    svg {
      margin-right: 5px;
    }

    &:last-child {
      border: 0;
    }
  }
`;
