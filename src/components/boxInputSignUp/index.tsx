import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

export const BoxInputSignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const { goBack } = useNavigation();

  const handleSignUp = () => {
    if (name && email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          firestore()
            .collection('users')
            .add({
              id: res.user.uid,
              name,
              email,
              password,
              photo: image ? image : '',
            })
            .then(() => alert('Usuário salvo com sucesso!'))
            .catch(() => alert('Usuário não foi salvo!'));
        })
        .catch(() => alert('Usuário não pode ser salvo'));
    }
  };

  const pickImage = async () => {
    if (name === '' && email === '' && password === '') {
      alert(
        'Essa funcionalidade está indisponivel, preencha os campos primeiros'
      );
    } else {
      const reference = storage().ref(name + '.png');
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        const pathToFile = result.uri;
        reference
          .putFile(pathToFile)
          .then((res) => {
            alert('Imagem salva com sucesso!');
            setImage(res.metadata.fullPath);
          })
          .catch((err) => console.log('Erro aqui', err));
      }
    }
  };

  const handleSignIn = () => {
    goBack();
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
      <TouchableOpacity
        style={{
          width: '50%',
          height: 30,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#080808',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        activeOpacity={0.6}
        onPress={pickImage}
      >
        <Text style={{ color: '#000' }}> Escolher foto </Text>
      </TouchableOpacity>
      <Text> Nome </Text>
      <TextInput
        placeholder='Seu novo nome'
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
        autoCapitalize={'words'}
        onChangeText={(t) => setName(t)}
      />
      <Text> Email </Text>
      <TextInput
        placeholder='Seu novo email'
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
        placeholder='Sua nova senha'
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
          onPress={handleSignUp}
        >
          <Text style={{ color: '#fff' }}> Cadastrar </Text>
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
          onPress={handleSignIn}
        >
          <Text style={{ color: '#ff0000' }}> Voltar para login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
