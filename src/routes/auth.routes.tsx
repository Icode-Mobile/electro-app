import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import CreateRequest from '../screens/createRequest';
import Details from '../screens/details';

import type { RequestProps } from '../components/requests';

export type NavigationProps = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  CreateRequest: undefined;
  Details: RequestProps;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationProps {}
  }
}

const Stack = createNativeStackNavigator<NavigationProps>();

export const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CreateRequest'
        component={CreateRequest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
