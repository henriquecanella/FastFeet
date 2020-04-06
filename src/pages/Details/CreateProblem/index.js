import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  ProblemInput,
  ProblemButton,
} from './styles';

export default function CreateProblem() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [description, setDescription] = useState('');

  async function handleCreateProblem() {
    try {
      await api.post(`delivery/${id}/problems`, { description });
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Verifique o texto enviado');
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Background />
      <Content>
        <ProblemInput onChangeText={setDescription} />
        <ProblemButton onPress={handleCreateProblem}>Enviar</ProblemButton>
      </Content>
    </Container>
  );
}
