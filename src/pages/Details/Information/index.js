import React from 'react';
import { View, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import {
  Container,
  Background,
  DetailsContainer,
  Card,
  TitleContainer,
  DeliveryTitle,
  Label,
  Value,
  DateContainer,
  ButtonsContainer,
  ButtonWrapper,
  ButtonText,
} from './styles';

export default function Information() {
  const route = useRoute();
  const navigation = useNavigation();
  const { delivery } = route.params;
  const deliveryman = useSelector((state) => state.user.profile);

  async function handleStart() {
    try {
      await api.put(`deliveryman/${deliveryman.id}/deliveries/${delivery.id}`);
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert(
        'Erro',
        'Erro ao iniciar entrega, verifique o horário ou a quantidade de entregas já pendentes no dia'
      );
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Background />
      <DetailsContainer>
        <Card>
          <TitleContainer>
            <Icon name="truck" size={30} color="#7D40E7" />
            <DeliveryTitle>Informações da entrega</DeliveryTitle>
          </TitleContainer>
          <Label>DESTINATÁRIO</Label>
          <Value>{delivery.recipient.name}</Value>

          <Label>ENDEREÇO DE ENTREGA</Label>
          <Value>{`${delivery.recipient.street}, ${
            delivery.recipient.number
          }, ${
            delivery.recipient.complement
              ? `${delivery.recipient.complement},`
              : ''
          } ${delivery.recipient.city} - ${delivery.recipient.state}, ${
            delivery.recipient.cep
          }`}</Value>

          <Label>PRODUTO</Label>
          <Value>{delivery.product}</Value>
        </Card>

        <Card>
          <TitleContainer>
            <Icon name="calendar" size={30} color="#7D40E7" />
            <DeliveryTitle>Situação da entrega</DeliveryTitle>
          </TitleContainer>
          <Label>STATUS</Label>
          <Value>{delivery.status}</Value>

          <DateContainer>
            <View>
              <Label>DATA DE RETIRADA</Label>
              <Value>
                {delivery.start_date !== null
                  ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
                  : '-- / -- / ----'}
              </Value>
            </View>

            <View>
              <Label>DATA DE ENTREGA</Label>
              <Value>
                {delivery.end_date !== null
                  ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
                  : '-- / -- / ----'}
              </Value>
            </View>
          </DateContainer>
        </Card>
        <ButtonsContainer>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('CreateProblem', { id: delivery.id })
            }
          >
            <ButtonIcon name="highlight-off" size={30} color="#E74040" />
            <ButtonText>Informar{'\n'}Problema</ButtonText>
          </ButtonWrapper>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('ListProblems', { id: delivery.id })
            }
          >
            <ButtonIcon name="info-outline" size={30} color="#E7BA40" />
            <ButtonText>Visualizar{'\n'}Problemas</ButtonText>
          </ButtonWrapper>

          {delivery.status === 'PENDENTE' ? (
            <ButtonWrapper onPress={handleStart}>
              <ButtonIcon name="local-shipping" size={30} color="#7D40E7" />
              <ButtonText>Realizar{'\n'}Retirada</ButtonText>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper
              onPress={() =>
                navigation.navigate('Confirm', { id: delivery.id })
              }
            >
              <ButtonIcon name="local-shipping" size={30} color="#7D40E7" />
              <ButtonText>Confirmar{'\n'}Entrega</ButtonText>
            </ButtonWrapper>
          )}
        </ButtonsContainer>
      </DetailsContainer>
    </Container>
  );
}
