import React from 'react';
import { View, Text, Image } from 'react-native';

interface HeaderProps {
  name: string;
  photo: string;
}

export const Header = ({ name, photo }: HeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
      }}
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#444' }}>
          {' '}
          Olá,{' '}
        </Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}> {name} </Text>
      </View>
      <View>
        <Image
          source={{ uri: photo }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#333',
          }}
        />
      </View>
    </View>
  );
};
