import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 140px;
`;

export const DetailsContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: -80px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Card = styled.View`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #0000001a;
`;

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const DeliveryTitle = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;

export const Label = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #999999;
  margin-bottom: 5px;
`;

export const Value = styled.Text`
  font-size: 13px;
  color: #666666;
  text-transform: capitalize;
  margin-bottom: 5px;
`;
export const DateContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fd;
  margin-bottom: 30px;
  border: 1px solid #0000001a;
  border-radius: 4px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #0000001a;
`;

export const ButtonText = styled.Text`
  font-size: 12px;
  color: #999999;
  text-align: center;
`;
