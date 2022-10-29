import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Header } from '../../components/header';
import { Request } from '../../components/requests';
import { Loading } from '../../components/loading';

import { useAuth } from '../../context/auth';

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

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [requestsAboutMe, setRequestsAboutMe] = useState<any>([]);
  const [anotherRequests, setAnotherRequests] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { navigate } = useNavigation();
  const { user, handleSignOut } = useAuth();

  useEffect(() => {
    user?.map((data) => {
      setCurrentUser(data);
      loadingRequestsAboutMe();
      loadingAnotherRequests();
    });
  }, []);

  const loadingRequestsAboutMe = async () => {
    const email = user?.map((data) => data.email);
    const subscriber = firestore()
      .collection('requests')
      .where('user.email', '==', email?.toString())
      .onSnapshot((query) => {
        const data = query.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as DataProps[];
        setRequestsAboutMe(data);
        setLoading(false);
      });

    return () => subscriber();
  };

  const loadingAnotherRequests = () => {
    const email = user?.map((data) => data.email);
    const subscriber = firestore()
      .collection('requests')
      .where('user.email', '!=', email?.toString())
      .onSnapshot((query) => {
        const data = query.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as DataProps[];
        setAnotherRequests(data);
      });

    return () => subscriber();
  };

  const handleMakeRequests = () => {
    navigate('CreateRequest');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: 'white',
      }}
    >
      <Header
        name={currentUser?.name! || 'Usuário'}
        photo={`https://firebasestorage.googleapis.com/v0/b/test-53af4.appspot.com/o/${currentUser?.photo}?alt=media`}
      />

      <View
        style={{ flexDirection: 'column', width: '100%', flex: 1, padding: 30 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
            height: 40,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          activeOpacity={0.8}
          onPress={handleMakeRequests}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            {' '}
            Fazer pedido{' '}
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50, zIndex: 1 }}>
          <Text style={{ fontSize: 16, color: '#555', fontWeight: '700' }}>
            {' '}
            Pedidos feitos por você{' '}
          </Text>
          <FlatList
            data={requestsAboutMe}
            renderItem={({ item, index }) => (
              <Request item={item} key={index} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
            contentContainerStyle={{ marginLeft: 10 }}
            alwaysBounceHorizontal
          />
        </View>
        <View style={{ marginTop: 50, zIndex: 1 }}>
          <Text style={{ fontSize: 16, color: '#555', fontWeight: '700' }}>
            {' '}
            Pedidos feitos por outros{' '}
          </Text>
          <FlatList
            data={anotherRequests}
            renderItem={({ item, index }) => (
              <Request item={item} key={index} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
            contentContainerStyle={{ marginLeft: 10 }}
            alwaysBounceHorizontal
          />
        </View>
      </View>
      <View style={{ marginBottom: 50 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#bb0505',
            width: 150,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          activeOpacity={0.7}
          onPress={() => {
            //BackHandler.exitApp();
            handleSignOut();
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            {' '}
            Sair{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
