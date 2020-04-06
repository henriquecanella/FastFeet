import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import CButton from '~/components/Button';
// import Text from '~/components/Text';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 155px;
`;
export const Content = styled.View`
  margin: -80px 20px 0 20px;

  flex: 1;
`;

export const CameraWrapper = styled.View`
  width: 100%;
  height: 80%;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const Button = styled(CButton)`
  background: #7d40e7;

  margin: 15px 0 15px 0;
`;

export const TakePictureButton = styled(RectButton)`
  background: rgba(000, 000, 000, 0.5);

  position: absolute;

  padding: 20px;
  border-radius: 100px;

  bottom: 25px;
  align-self: center;
`;
