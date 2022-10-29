import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/auth';

export const BoxInputSignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { navigate } = useNavigation();
  const context = useAuth();

  const handleSignUp = async () => {
    navigate('SignUp');
  };

  const handleLogIn = async () => {
    await context.handleSignIn({ email, password });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 40,
        flexDirection: 'column',
      }}
    >
      <Text> Email </Text>
      <TextInput
        placeholder='Seu email'
        style={{
          backgroundColor: 'none',
          borderBottomWidth: 1,
          borderBottomColor: 'red',
          width: '100%',
          height: 50,
          paddingHorizontal: 8,
          marginBottom: 30,
        }}
        selectionColor={'#000'}
        importantForAutofill={'no'}
        autoCapitalize={'none'}
        onChangeText={(t) => setEmail(t)}
      />
      <Text> Senha </Text>
      <TextInput
        placeholder='Sua senha'
        style={{
          backgroundColor: 'none',
          borderBottomWidth: 1,
          borderBottomColor: 'red',
          width: '100%',
          height: 50,
          paddingHorizontal: 8,
        }}
        selectionColor={'#000'}
        importantForAutofill={'no'}
        secureTextEntry
        autoCapitalize={'none'}
        onChangeText={(t) => setPassword(t)}
      />
      <View
        style={{ marginTop: 40, flexDirection: 'column', alignItems: 'center' }}
      >
        <TouchableOpacity
          style={{
            width: '80%',
            height: 50,
            backgroundColor: '#080808',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          activeOpacity={0.6}
          onPress={handleLogIn}
        >
          <Text style={{ color: '#fff' }}> Entrar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 50,
            backgroundColor: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={handleSignUp}
        >
          <Text style={{ color: '#ff0000' }}> Registrar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
