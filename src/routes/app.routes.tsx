import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';

import type { RequestProps } from '../components/requests';

type NavigationProps = {
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

export const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
