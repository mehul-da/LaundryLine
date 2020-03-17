import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WasherDryerScreen from './WasherDryerScreen';
import { Button } from 'react-native-elements';
import Firebase, {db} from './config/FireBase';

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  screenText: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  homeScreen: {
    flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logInEmail: "",
      logInPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      code: "",
    }; 
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
          <Text style = {{color:"black", fontSize: 25, fontWeight: "bold"}}> Sign Up </Text>
          <View style = {{paddingBottom: 10, paddingTop: 20}}>      
          <TextInput
          style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
          placeholder = " Email"
          placeholderTextColor = "black"
          autoCapitalize = "none"
          onChangeText = {(text) => this.setState({signUpEmail: text})}
          autoCorrect = {false}/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
          <TextInput
          secureTextEntry = {true}
          password = {true}
          style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
          placeholder = " Password"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({signUpPassword: text})}
          placeholderTextColor = "black"/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 8, paddingBottom: 15}}>      
          <TextInput
          style={{ width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
          placeholder = " Special Code"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({code: text})}
          placeholderTextColor = "black"/>
          </View>
          <Button color = "black" title = "Create account!" style = {{width: 160, paddingTop: 8}} 
          buttonStyle = {{borderRadius: 15, backgroundColor: "black"}}
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
          <Text style = {{color: "black", fontSize: 25, fontWeight: "bold"}}>LaundryLine</Text>
          <View style = {{paddingBottom: 10, paddingTop: 20}}>      
            <TextInput
          style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
          placeholder = " Email"
          autoCapitalize = "none"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({logInEmail: text})}
          placeholderTextColor = "black"/>
          </View>
          <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
          <TextInput
          secureTextEntry = {true}
          password = {true}
          autoCapitalize = "none"
          style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
          placeholder = " Password"
          autoCorrect = {false}
          onChangeText = {(text) => this.setState({logInPassword: text})}
          placeholderTextColor = "black"
          clearButtonMode = 'always'/>
          </View>
          <Button color = "white" title = "Login" style = {{width: 100, paddingTop: 8}}
            buttonStyle = {{backgroundColor: "black", borderRadius: 15}}
            onPress={() => this.handleLogIn({navigation})}>
          </Button>
          <View style = {{paddingTop: 24}}>
          <Text style = {{fontSize: 13, color:"black", textAlign: "center"}}> Don't have an account yet? </Text>
          <Text style={{fontSize: 13, color:"rgb(245,92,92)", textAlign: "center"}} onPress={()=> navigation.navigate('Sign Up')}> Sign Up </Text>
          </View>
        </KeyboardAwareScrollView>
      );
    }

    handleLogIn = ({navigation}) => {
      const { logInEmail, logInPassword } = this.state

        Firebase.auth()
            .signInWithEmailAndPassword(logInEmail, logInPassword)
            .then(() => this.loggedInOrSignedUp({navigation}))
            .catch(error => this.sendAlert(error))
    }

    handleSignUp = ({navigation}) => {

      try {
        const { signUpEmail, signUpPassword } = this.state;
        const response = Firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        if (response.user.uid) {
            const user = {
                uid: response.user.uid,
                email: signUpEmail
            }

            db.collection('users')
                .doc(response.user.uid)
                .set(user)

            this.loggedInOrSignedUp({navigation})
        }
    } catch (e) {
        Alert.alert(String(e))
    }

        // const { signUpEmail, signUpPassword } = this.state;
        // Firebase.auth()
        //     .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        //     .then(() => this.loggedInOrSignedUp({navigation}))
        //     .catch(error => this.sendAlert(error))
    }

    sendAlert = (error) => {
        Alert.alert(String(error))
    }

    loggedInOrSignedUp = ({navigation}) => {
      this.setState({logInEmail: '', logInPassword: '', signUpEmail: '', signUpPassword: ''});
      navigation.navigate('Home');
    }

    render() {
      return (
        <NavigationContainer theme = {this.MyTheme}>
          <Stack.Navigator initialRouteName="Log In" headerMode = "none">
            <Stack.Screen name="Log In" component={this.LogInScreen} />
            <Stack.Screen name="Washers and Dryers" component={WasherDryerScreen} />
            <Stack.Screen name ="Home" component = {this.HomeScreen} />
            <Stack.Screen name="Sign Up" component={this.SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
}

export default AppNavigator;

