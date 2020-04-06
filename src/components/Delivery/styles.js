import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #0000001a;
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;

  padding: 14px;
`;

export const DeliveryNumber = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;

export const StatusBarContainer = styled.View`
  margin-bottom: 20px;
`;

export const StatusTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const StatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 45px;
  margin-left: 12px;
`;

export const Bullet = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${(props) => (props.status ? '#7D40E7' : '#fff')};
  border: 1px solid #7d40e7;
`;
export const Line = styled.View`
  flex: 1;
  height: 1px;
  background: #7d40e7;
`;

export const StatusText = styled.Text`
  font-size: 8px;
  text-align: center;
  color: #999;
`;

export const DeliveryDetails = styled.View`
  background: #f8f9fd;
  padding: 14px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FooterContainer = styled.View``;

export const Label = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999999;
`;

export const Value = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;

export const Details = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;
