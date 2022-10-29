import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/auth';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
}

export default function CreateRequest() {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useAuth();
  const { goBack } = useNavigation();

  moment.locale('pt-br');

  useEffect(() => {
    loadingUser();
  }, []);

  const loadingUser = async () => {
    user?.map((data) => {
      setCurrentUser(data);
    });
  };

  const handleSendRequest = () => {
    let now = moment();
    const hour = now.format('LT');
    const date = now.format('L');

    firestore()
      .collection('requests')
      .add({
        title,
        description,
        date: date.toString(),
        hour: hour.toString(),
        user: {
          name: currentUser?.name,
          email: currentUser?.email,
          photo: `https://firebasestorage.googleapis.com/v0/b/test-53af4.appspot.com/o/${currentUser?.photo}?alt=media`,
        },
        resolved: false,
      })
      .then(() => {
        alert('Pedido realizado com sucesso!');
        goBack();
      })
      .catch((err) => console.log(err));

    setTitle('');
    setDescription('');
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          paddingTop: 40,
        }}
      >
        <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 18 }}>
          {' '}
          Novo Pedido{' '}
        </Text>
        <KeyboardAvoidingView
          behavior='position'
          enabled
          style={{ width: '100%', padding: 10 }}
        >
          <>
            <View style={{ width: '100%', padding: 10 }}>
              <View>
                <Text> Titulo do problema </Text>
                <TextInput
                  placeholder='Escreva aqui...'
                  style={{
                    backgroundColor: 'none',
                    borderBottomWidth: 1,
                    borderBottomColor: 'red',
                    width: '90%',
                    height: 40,
                    paddingHorizontal: 5,
                    marginBottom: 30,
                    marginLeft: 10,
                  }}
                  selectionColor={'#000'}
                  importantForAutofill={'no'}
                  autoCapitalize={'none'}
                  onChangeText={(t) => setTitle(t)}
                  defaultValue={title}
                />
              </View>
              <View>
                <Text> Descrição do problema </Text>
                <TextInput
                  placeholder='Escreva aqui...'
                  style={{
                    backgroundColor: 'none',
                    borderBottomWidth: 1,
                    borderBottomColor: 'red',
                    width: '90%',
                    height: 40,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    marginLeft: 10,
                  }}
                  selectionColor={'#000'}
                  importantForAutofill={'no'}
                  autoCapitalize={'none'}
                  onChangeText={(t) => setDescription(t)}
                  defaultValue={description}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  width: '50%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  borderRadius: 10,
                }}
                onPress={handleSendRequest}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>
                  {' '}
                  Criar novo pedido{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
