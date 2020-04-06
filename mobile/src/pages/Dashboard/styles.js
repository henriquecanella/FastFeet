import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #fff;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Text = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #444;
`;

export const Welcome = styled.Text`
  color: #666;
  font-size: 12px;
  margin-top: 4px;
`;

export const Deliveries = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonConatainer = styled.View`
  width: 140px;
  flex-direction: row;
  justify-content: space-between;
`;

export const StatusButton = styled.Text`
  color: ${(props) => (props.active ? '#7D40E7' : '#999')};
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
  font-size: 12px;
  font-weight: bold;
  margin-top: 4px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 30, paddingBottom: 30 },
})``;
