import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  RestaurantScreen,
  AddRestaurantScreen,
  ProfileScreen,
} from '~/components/screens';
import { HomeScreen as Home } from '~/components/screens/Home2';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '~/store/slices/application';
import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '~/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddRestaurant } from '~/components/screens/AddRestaurant';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const RestaurantsWrapper = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Restaurant"
      component={RestaurantScreen}
      options={{
        title: 'Restaurant',
      }} />
  </Stack.Navigator>
);

const TabsWrapper = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Group>
      <Tab.Screen
        name="Home"
        component={RestaurantsWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
          title: 'Restaurants',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="AddRestaurant"
        component={AddRestaurantScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
          title: 'Add Restaurant',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SignUpScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
          title: 'Profile',
        }}
      />
    </Tab.Group>
  </Tab.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Home"
      component={TabsWrapper}
    />
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
