import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  CameraWrapper,
  Camera,
  Button,
  TakePictureButton,
} from './styles';

export default function DeliveryConfirmPhoto() {
  const navigation = useNavigation();
  const route = useRoute();
  // eslint-disable-next-line prefer-const
  let cameraRef = useRef(null);
  const [pictureUri, setPictureUri] = useState('');
  const deliveryman = useSelector((state) => state.user.profile);

  async function handleSubmit() {
    const photo = {
      uri: pictureUri,
      name: `signature.jpeg`,
      type: 'image/jpeg',
    };

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('file', photo);

    try {
      const response = await api.post('files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await api.put(
        `/deliveryman/${deliveryman.id}/deliveries/${route.params.id}`,
        {
          signature_id: response.data.id,
        }
      );
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao finalizar a entrega!');
    }
  }

  async function handletakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await setPictureUri(data.uri);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        {pictureUri ? (
          <CameraWrapper>
            <Image source={{ uri: pictureUri }} style={{ height: '100%' }} />
          </CameraWrapper>
        ) : (
          <CameraWrapper>
            <Camera ref={cameraRef} type="back" captureAudio={false} />
            <TakePictureButton onPress={handletakePicture}>
              <Icon name="photo-camera" color="#fff" size={30} />
            </TakePictureButton>
          </CameraWrapper>
        )}
        <Button onPress={handleSubmit} loading={false}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
