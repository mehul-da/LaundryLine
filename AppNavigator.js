import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WasherDryerScreen from './WasherDryerScreen';
import { Button } from 'react-native-elements';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenText: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgb(124, 102, 154 )',
      justifyContent: 'center'
  },
  homeScreen: {
    flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgb(124, 102, 154 )',
      justifyContent: 'center'
  }
});

class AppNavigator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logInUsername: "",
      logInPassword: "",
      signUpUsername: "",
      signUpPassword: "",
      code: ""
    };
    this.map = new Map(); 
  }

    MyTheme = {
      ...DefaultTheme,
      colors: {
          primary: 'rgb(255, 45, 85)',
          background: 'rgb(242, 242, 242)',
          card: 'rgb(255, 255, 255)',
          text: 'rgb(28, 28, 30)',
          border: 'rgb(199, 199, 204)',
      },
    };

    HomeScreen = ({ navigation }) => {
      return (
      <View style = {styles.homeScreen}> 
      <View style = {{paddingBottom: 10}}>
      <Text style = {{color:"white", fontSize: 25, fontWeight: "bold"}}> Welcome to LaundryLine! </Text>
      </View>
      <Button color = "white" title = "See washers and dryers on your floor!" style = {{width: 200, paddingTop: 8}}
      onPress={() => navigation.navigate('Washers and Dryers')} />
      </View>
      );
    }

    SignupScreen = ({ navigation }) => {
      return (
          <KeyboardAwareScrollView
          contentContainerStyle={styles.screenText}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false} >
          <Text style = {{color:"white", fontSize: 25, fontWeight: "bold"}}> Sign Up </Text>
          <View style = {{paddingBottom: 10, paddingTop: 20}}>      
          <TextInput
          style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white"}}
          placeholder = "  Username"
          placeholderTextColor = "white"
          autoCapitalize = "none"
          onChangeText = {(text) => this.setState({signUpUsername: text})}
          autoCorrect = {false}/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
          <TextInput
          secureTextEntry = {true}
          password = {true}
          style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white", paddingLeft: 5}}
          placeholder = " Password"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({signUpPassword: text})}
          placeholderTextColor = "white"/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 8, paddingBottom: 15}}>      
          <TextInput
          style={{ width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white"}}
          placeholder = "  Special Code"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({code: text})}
          placeholderTextColor = "white"/>
          </View>
          <Button color = "white" title = "Create account!" style = {{width: 200, paddingTop: 8}}
          onPress={() => this.handleSignUp({navigation})}>
          </Button>
          </KeyboardAwareScrollView>
      );
    }

    LogInScreen = ({ navigation }) => {
      return (
          <KeyboardAwareScrollView
          contentContainerStyle={styles.screenText}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}>
          <View style = {{paddingBottom: 20}}>
              <Image source = {require('./logo.png')} style = {{width: 180, height: 180, alignSelf: 'center'}}/>
          </View>
          <Text style = {{color: "white", fontSize: 25, fontWeight: "bold"}}>LaundryLine</Text>
          <View style = {{paddingBottom: 10, paddingTop: 20}}>      
            <TextInput
          style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white"}}
          placeholder = "  Username"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({logInUsername: text})}
          placeholderTextColor = "white"/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
          <TextInput
          secureTextEntry = {true}
          password = {true}
          autoCapitalize = "none"
          style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white", paddingLeft: 5}}
          placeholder = " Password"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({logInPassword: text})}
          placeholderTextColor = "white"/>
          </View>
          <Button color = "white" title = "Login" style = {{width: 200, paddingTop: 8}}
            onPress={() => this.handleLogIn({navigation})}>
          </Button>
          <View style = {{paddingTop: 18}}>
          <Text style = {{fontSize: 11, color:"white", textAlign: "center"}}> Don't have an account yet? </Text>
          <Text style={{fontSize: 11, color:"rgb(245,92,92)", textAlign: "center"}} onPress={()=> navigation.navigate('Sign Up')}> Sign Up </Text>
          </View>
        </KeyboardAwareScrollView>
      );
    }

    handleLogIn = ({navigation}) => {
      if (this.map.has(this.state.logInUsername) && this.map.get(this.state.logInUsername) === this.state.logInPassword) {
        navigation.navigate('Home');
        this.setState({logInUsername: '', logInPassword: ''});
      } else {
        return (
          Alert.alert('NOTE', 'USERNAME AND/OR PASSWORD ARE INCORRECT. TRY AGAIN.')
        )
      }
    }

    handleSignUp = ({navigation}) => {
      if (!this.map.has(this.state.signUpUsername) && this.state.signUpPassword.length >= 8 && this.state.signUpUsername.length > 0) {
        this.map.set(this.state.signUpUsername, this.state.signUpPassword);
        navigation.navigate('Home');
        this.setState({signUpPassword: '', signUpUsername: '', code: ''});
      } else if (this.map.has(this.state.signUpUsername)) {
        return (
          Alert.alert('NOTE', 'USERNAME HAS BEEN TAKEN. TRY AGAIN.')
        )
      } else if (this.state.signUpUsername.length == 0) {
          Alert.alert('NOTE', 'PLEASE ENTER A USERNAME.');
      } else {
        return (
          Alert.alert('NOTE', 'PASSWORD SHOULD BE AT LEAST 8 CHARACTERS LONG. TRY AGAIN.')
        )
      }
    }

    render() {
      return (
        <NavigationContainer theme = {this.MyTheme}>
          <Stack.Navigator initialRouteName="Log In">
            <Stack.Screen name="Log In" component={this.LogInScreen} />
            <Stack.Screen name="Washers and Dryers" component={WasherDryerScreen} />
            <Stack.Screen name = "Home" component = {this.HomeScreen} />
            <Stack.Screen name="Sign Up" component={this.SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
}

export default AppNavigator;


