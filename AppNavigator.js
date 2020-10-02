import * as React from 'react';
import WasherDryer from './screens/WasherDryer';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Verification from './screens/Verification';
import HowThisWorks from './screens/HowThisWorks';
import Chat from './screens/Chat'
import Firebase, {db} from './config/Firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator,  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

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
    },
    Chat: {
      screen: Chat
    },
    Verification: {
      screen: Verification
    }
  },
  {
    initialRouteName: 'Login'
  }
)

export default createAppContainer(AppNavigator)