import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  signed: boolean;
  handleSignIn: any;
  handleSignOut: any;
  user: UserProps[] | null;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
}

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps[] | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@electroapp:user');

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const handleSignIn = async ({ email, password }: LoginProps) => {
    const result = await auth().signInWithEmailAndPassword(email, password);
    const user = await firestore()
      .collection('users')
      .where('id', '==', result.user.uid)
      .get();
    const res = user.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    setUser(res as UserProps[]);
    await AsyncStorage.setItem('@electroapp:user', JSON.stringify(res));
  };

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        handleSignIn,
        user,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
