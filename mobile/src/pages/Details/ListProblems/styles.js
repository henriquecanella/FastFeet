import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 140px;
`;

export const Content = styled.View`
  margin-top: -80px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Problem = styled.View`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #eee;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ProblemText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  color: #999999;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
