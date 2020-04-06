import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';

import Delivery from '~/components/Delivery';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Header,
  Left,
  Avatar,
  Info,
  Welcome,
  Text,
  Deliveries,
  ButtonConatainer,
  StatusButton,
  List,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const deliveryman = useSelector((state) => state.user.profile);

  const [deliveries, setDeliveries] = useState([]);
  const [pendentes, setPendentes] = useState(true);
  const [entregues, setEntregues] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(
        `deliveryman/${deliveryman.id}/deliveries`
      );

      const data = response.data.map((delivery) => {
        let status = '';

        if (delivery.canceled_at !== null) {
          status = 'CANCELADA';
        } else if (delivery.start_date !== null && delivery.end_date !== null) {
          status = 'ENTREGUE';
        } else if (delivery.start_date !== null && delivery.end_date === null) {
          status = 'RETIRADA';
        } else if (delivery.start_date === null && delivery.end_date === null) {
          status = 'PENDENTE';
        }

        return {
          ...delivery,
          status,
        };
      });

      let formattedData = '';

      if (pendentes === true) {
        formattedData = data.filter((delivery) => {
          return (
            delivery.status === 'RETIRADA' || delivery.status === 'PENDENTE'
          );
        });
      } else {
        formattedData = data.filter((delivery) => {
          return delivery.status === 'ENTREGUE';
        });
      }

      if (isFocused) {
        setDeliveries(formattedData);
      }
    }
    loadDeliveries();
  }, [deliveryman.id, isFocused, pendentes]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handlePendentes() {
    setPendentes(true);
    setEntregues(false);
  }

  function handleEntregues() {
    setPendentes(false);
    setEntregues(true);
  }

  return (
    <Container>
      <Header>
        <Left>
          <Avatar
            source={{
              uri: deliveryman.avatar
                ? deliveryman.avatar.url
                : `https://api.adorable.io/avatar/50/${deliveryman.name}`,
            }}
          />

          <Info>
            <Welcome>Bem vindo de volta,</Welcome>
            <Text>{deliveryman.name}</Text>
          </Info>
        </Left>

        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout-variant" size={20} color="#f64c75" />
        </TouchableOpacity>
      </Header>

      <Deliveries>
        <Text>Entregas</Text>
        <ButtonConatainer>
          <TouchableOpacity onPress={handlePendentes}>
            <StatusButton active={pendentes}>Pendentes</StatusButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEntregues}>
            <StatusButton active={entregues}>Entregues</StatusButton>
          </TouchableOpacity>
        </ButtonConatainer>
      </Deliveries>

      <List
        data={deliveries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
      />
    </Container>
  );
}
