import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export interface RequestProps {
  item: {
    id: number;
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
}

export const Request = ({ item }: RequestProps) => {
  const { navigate } = useNavigation();

  const handleNavigateToDetails = () => {
    navigate('Details', {
      item,
    });
  };

  return (
    <View
      style={{
        backgroundColor: '#d5ded7',
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 260,
        borderRadius: 10,
        zIndex: 1,
      }}
    >
      <Image
        source={{ uri: item.user.photo }}
        style={{
          width: 60,
          height: 60,
          marginLeft: 5,
          borderRadius: 5,
        }}
      />
      <View
        style={{
          marginLeft: 10,
          flexDirection: 'column',
          paddingTop: 10,
          width: '68%',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: '#111',
            textAlign: 'left',
            alignSelf: 'baseline',
          }}
        >
          {' '}
          {item.title}{' '}
        </Text>
        <Text style={{ color: '#c50d0d', fontSize: 13 }}>
          {' '}
          {item.user.name}{' '}
        </Text>
        {item.resolved && (
          <Text style={{ fontSize: 10, color: '#531f00' }}>
            {' '}
            * Esse problema foi resolvido{' '}
          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: '#888',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
            width: 110,
            height: 30,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 6,
          }}
          activeOpacity={0.7}
          onPress={() => handleNavigateToDetails()}
        >
          <Text style={{ color: '#f8f8f8' }}> Ver detalhes </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
