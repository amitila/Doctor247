import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SignInByPhoneScreen from './SignInByPhoneScreen';
import SignUpByPhoneScreen from './SignUpByPhoneScreen';
import ForgotPassScreen from './ForgotPassScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{ headerShown: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignInByPhoneScreen" component={SignInByPhoneScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="SignUpByPhoneScreen" component={SignUpByPhoneScreen}/>
        <RootStack.Screen name="ForgotPassScreen" component={ForgotPassScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;