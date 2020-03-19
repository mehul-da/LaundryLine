import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import WasherDryer from './screens/WasherDryer';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HowThisWorks from './screens/HowThisWorks';
import Firebase, {db} from './config/FireBase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    WasherDryer: {
      screen: WasherDryer
    },
    HowThisWorks: {
      screen: HowThisWorks
    }
  },
  {
    initialRouteName: 'Login'
  }
)

export default createAppContainer(AppNavigator)