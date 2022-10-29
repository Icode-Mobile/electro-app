import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

import { NavigationProps } from '../../routes/auth.routes';

import { useAuth } from '../../context/auth';

type Props = NativeStackScreenProps<NavigationProps, 'Details', 'MyStack'>;

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
}

type DataProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  hour: string;
  user: {
    name: string;
    email: string;
    photo: string;
  };
  resolved: boolean;
};

export default function Details() {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [request, setRequest] = useState<DataProps[]>();
  const { params } = useRoute<Props['route']>();
  const { goBack } = useNavigation();
  const { user } = useAuth();

  /*Contrucao do layout voltado para:
    - Construcao de mensagens que vão sendo
    respondidas por cada usuário, inclusive pelo criador do POST (dando um certo destaque)
    - Assim que o problema for resolvido, o criador pode dar o caso como encerrado, fechando o POST
  */

  const handleCloseRequest = () => {
    firestore()
      .collection('requests')
      .doc(params.item.id.toString())
      .update({
        resolved: true,
      })
      .then(() => {
        Alert.alert('Post atualizado', 'Seu post foi fechado com sucesso!');
        goBack();
      })
      .catch(() => Alert.alert('ERRO', 'Não foi possivel fechar o seu post!'));
  };

  const handleDeleteRequest = () => {
    firestore()
      .collection('requests')
      .doc(params.item.id.toString())
      .delete()
      .then(() => {
        Alert.alert('Post apagado', 'Seu post foi apagado com sucesso!');
        goBack();
      })
      .catch(() => Alert.alert('ERRO', 'Não foi possivel apagar o seu post!'));
  };

  const getRequestById = () => {
    const subscriber = firestore()
      .collection('requests')
      .onSnapshot((query) => {
        const data = query.docs
          .filter((doc) => params.item.id.toString() === doc.id)
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as DataProps[];
        setRequest(data);
      });

    return () => subscriber();
  };

  useEffect(() => {
    user?.map((u) => {
      setCurrentUser(u);
    });
    getRequestById();
  }, []);

  return (
    <ScrollView style={{ flex: 1, paddingTop: 40 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 24 }}> {params.item.title} </Text>
          <Text
            style={{ fontSize: 16, paddingHorizontal: 10, color: '#838383' }}
          >
            Post feito por{' '}
            {params.item.user.email === currentUser?.email
              ? 'você'
              : params.item.user.name}{' '}
          </Text>
        </View>
        {params.item.user.email === currentUser?.email &&
          params.item.resolved !== true && (
            <TouchableOpacity
              style={{
                backgroundColor: '#bb0505',
                width: 120,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              activeOpacity={0.7}
              onPress={handleCloseRequest}
            >
              <Text style={{ color: '#fff' }}> Fechar post </Text>
            </TouchableOpacity>
          )}
        {params.item.resolved === true && (
          <TouchableOpacity
            style={{
              backgroundColor: '#333',
              width: 120,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            activeOpacity={0.7}
            onPress={handleDeleteRequest}
          >
            <Text style={{ color: '#fff' }}> Apagar post </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ padding: 20 }}>
        {request?.map((req) => (
          <View
            style={{
              width: '100%',
              height: 150,
              borderWidth: 1,
              borderColor: '#bb0505',
              borderStyle: 'solid',
            }}
            key={req.id}
          >
            <Text
              style={{
                fontSize: 17,
                color: '#222',
                textAlignVertical: 'center',
                textAlign: 'left',
                paddingLeft: 5,
              }}
            >
              {' '}
              {req.description}{' '}
            </Text>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: '60%',
                width: '98%',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#111',
                  width: 100,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff' }}> Responder </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
