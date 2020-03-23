import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Icon, Input } from 'react-native-elements';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/FireBase.js'

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8DBD7'
    },
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            let alreadySent = false;
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    if (!user.emailVerified && !alreadySent) {
                        user.sendEmailVerification().then(function() {
                            // Email sent.
                        }).catch(function(error) {
                            // An error happened.
                        });
                        alreadySent = true;
                        this.props.navigation.navigate('Verification');
                    }  else 
                        this.props.navigation.navigate('WasherDryer')
                }
            }
        })
    }

    handleLogin = () => {
        this.props.login();
    }

    render() {
        return (
            <KeyboardAwareScrollView
            contentContainerStyle={styles.screenText}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
            <View style = {{paddingBottom: 25}}>
                <Image source = {require('../logo.png')} style = {{width: 180, height: 180, alignSelf: 'center'}}/>
            </View>
            <Text style = {{color: "black", fontSize: 35, fontFamily: "Verdana"}}>laundryline</Text>
            <View style = {{paddingBottom: 10, paddingTop: 32}}>   
            <View style = {{width: 280}}>  
                <Input
                leftIcon={{ type: 'material-community', name: 'email' }} 
                leftIconContainerStyle = {{paddingRight: 10}}
                inputStyle = {{fontSize: 16}}
                autoCapitalize = "none"
                autoCorrect = {false}
                value = {this.props.user.email}
                onChangeText = {(text) => this.props.updateEmail(text)}
                placeholder = "Email"/>
            </View> 
            </View>
            <View style = {{paddingTop: 10}}>     
            <View style = {{width: 280}}>  
                <Input
                leftIcon={{ type: 'material-community', name: 'lock' }} 
                leftIconContainerStyle = {{paddingRight: 10}}
                inputStyle = {{fontSize: 16}}
                autoCapitalize = "none"
                secureTextEntry = {true}
                password = {true}
                autoCorrect = {false}
                value = {this.props.user.password}
                onChangeText = {(text) => this.props.updatePassword(text)}
                placeholder = "Password"/>
            </View> 
            </View>
            <View style = {{paddingTop: 28}}>
            <Icon
            raised
            name='arrow-right'
            type='font-awesome'
            color='black'
            reverse = {true}
            onPress={() => this.handleLogin()} />
            </View>
            <View style = {{paddingTop: 20}}>
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


