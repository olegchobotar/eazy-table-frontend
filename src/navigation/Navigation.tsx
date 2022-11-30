import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  RestaurantScreen,
} from '~/components/screens';
import { HomeScreen as Home } from '~/components/screens/Home2';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '~/store/slices/application';
import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '~/types';

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="Restaurant"
      component={RestaurantScreen}
      options={{
        headerShown: true,
        title: 'Restaurant Reservation',
      }}/>

    <Stack.Group>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  const onAuthStateChanged = (userData) => {
    dispatch(updateCurrentUser(userData));

    if (initializing) {
      setInitializing(false);
    }
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};
