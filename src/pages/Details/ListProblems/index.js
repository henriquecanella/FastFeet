import React, { useEffect, useState } from 'react';

import {
  useIsFocused,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';

import api from '~/services/api';

import {
  Container,
  Background,
  List,
  Problem,
  Content,
  ProblemText,
  ProblemDate,
} from './styles';

export default function ListProblems() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [problems, setProblems] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/${id}/problems`);

      if (isFocused) {
        setProblems(response.data);
      }
    }
    loadProblems();
  }, [id, isFocused]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Background />
      <Content>
        <List
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Problem>
              <ProblemText>{item.description}</ProblemText>
              <ProblemDate>{item.id}</ProblemDate>
            </Problem>
          )}
        />
      </Content>
    </Container>
  );
}
