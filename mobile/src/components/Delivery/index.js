import React from 'react';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TextContainer,
  DeliveryNumber,
  StatusBarContainer,
  StatusText,
  DeliveryDetails,
  FooterContainer,
  StatusContainer,
  Label,
  Value,
  Details,
  Bullet,
  Line,
  StatusTextContainer,
} from './styles';

export default function Delivery({ data }) {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('Information', { delivery: data });
  }

  return (
    <Container>
      <TextContainer>
        <Icon name="truck" size={30} color="#7D40E7" />
        <DeliveryNumber>{`Encomenda 0${data.id}`}</DeliveryNumber>
      </TextContainer>

      <StatusBarContainer>
        <StatusContainer>
          <Bullet status />
          <Line />
          <Bullet
            status={data.status === 'RETIRADA' || data.status === 'ENTREGUE'}
          />
          <Line />
          <Bullet status={data.status === 'ENTREGUE'} />
        </StatusContainer>

        <StatusTextContainer>
          <StatusText>Aguardando {'\n'} Retirada</StatusText>
          <StatusText>Retirada</StatusText>
          <StatusText>Entregue</StatusText>
        </StatusTextContainer>
      </StatusBarContainer>

      <DeliveryDetails>
        <FooterContainer>
          <Label>Data</Label>
          <Value>
            {data.start_date !== null
              ? format(parseISO(data.start_date), 'dd/MM/yyyy')
              : '-- / -- / ----'}
          </Value>
        </FooterContainer>

        <FooterContainer>
          <Label>Cidade</Label>
          <Value>{data.recipient.city}</Value>
        </FooterContainer>
        <TouchableOpacity onPress={handleNavigate}>
          <Details>Ver detalhes</Details>
        </TouchableOpacity>
      </DeliveryDetails>
    </Container>
  );
}
