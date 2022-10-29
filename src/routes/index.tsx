import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
  const { signed } = useAuth();

  return signed ? <AuthRoutes /> : <AppRoutes />;
};
