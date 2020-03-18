import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/FireBase.js'

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

class Login extends React.Component {

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Home');
                }
            }
        }
        
            )
    }

    handleLogin = () => {
        this.props.login();
    }

    render() {
        return (
            <KeyboardAwareScrollView
            contentContainerStyle={styles.screenText}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}>
            <View style = {{paddingBottom: 20}}>
                <Image source = {require('../logo.png')} style = {{width: 180, height: 180, alignSelf: 'center'}}/>
            </View>
            <Text style = {{color: "black", fontSize: 25, fontWeight: "bold", fontFamily: "Trebuchet MS"}}>LaundryLine</Text>
            <View style = {{paddingBottom: 10, paddingTop: 20}}>      
              <TextInput
            style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Email"
            autoCapitalize = "none"
            autoCorrect = {false}
            value = {this.props.user.email}
            onChangeText = {(text) => this.props.updateEmail(text)}
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
            value = {this.props.user.password}
            onChangeText = {(text) => this.props.updatePassword(text)}
            placeholderTextColor = "black"
            clearButtonMode = 'always'/>
            </View>
            <Icon
            raised
            name='arrow-right'
            type='font-awesome'
            color='black'
            reverse = {true}
            onPress={() => this.handleLogin()} />
            <View style = {{paddingTop: 24}}>
            <Text style = {{fontSize: 13, color:"black", textAlign: "center"}}> Don't have an account yet? </Text>
            <Text style={{fontSize: 13, color:"rgb(245,92,92)", textAlign: "center"}} onPress={()=> this.props.navigation.navigate('Signup')}> Sign up. </Text>
            </View>
          </KeyboardAwareScrollView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)