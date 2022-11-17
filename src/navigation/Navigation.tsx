import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../components/screens/Home';
import { DetailsScreen } from '../components/screens/Details';
import SignInScreen from '../components/screens/SignIn';
import SignUpScreen from '../components/screens/SignUp';
import ForgotPasswordScreen from '../components/screens/ForgotPassword';

const Stack = createStackNavigator();

const HomeNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Details' component={DetailsScreen}/>

        <Stack.Group>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
        </Stack.Group>
    </Stack.Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>
);
