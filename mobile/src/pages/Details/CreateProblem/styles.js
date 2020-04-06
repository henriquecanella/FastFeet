import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

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

export const ProblemInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
  placeholder: 'Inclua aqui o problema que ocorreu na entrega.',
  multiline: true,
  numberOfLines: 11,
})`
  border: 1px solid #eee;
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
  color: #999999;

  align-items: center;

  padding: 20px;
  margin-bottom: 20px;
`;

export const ProblemButton = styled(Button)`
  background: #7d40e7;
`;
