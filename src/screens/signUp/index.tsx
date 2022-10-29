import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Icon from '../../../assets/icon.png';

import { BoxInputSignUp } from '../../components/boxInputSignUp';

export default function SignUp() {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: '#fff' }}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        behavior='padding'
        enabled
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View
          style={{
            alignItems: 'center',
            paddingTop: 60,
            backgroundColor: '#fff',
          }}
        >
          <Image
            source={Icon}
            style={{
              width: 100,
              height: 100,
            }}
          />

          <Text style={{ fontSize: 22 }}> Electro App </Text>

          <BoxInputSignUp />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
