import { ActivityIndicator, View } from 'react-native';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
      }}
    >
      <ActivityIndicator size={30} color={'#000'} />
    </View>
  );
};
