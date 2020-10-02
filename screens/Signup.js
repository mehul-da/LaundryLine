import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateCode, updateName, signup } from '../actions/user';
import Firebase, { db } from '../config/Firebase';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, updateName, signup, updateCode }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
    },
    homeScreen: {
      flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

class Signup extends React.Component {


    handleSignUp = () => {
        var nameRegex = /[A-Za-z]+\s[A-Za-z]+/;
        const usersRef = db.collection('codes').doc(String(this.props.user.code))
        let allowSignup = String(this.props.user.name).length > 2 && nameRegex.test(String(this.props.user.name));
        let alreadyAlerted = false;

        usersRef.get()
            .then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    allowSignup = false;
                    alreadyAlerted = true;
                    usersRef.onSnapshot((doc) => {
                        Alert.alert("Error", "Please make sure:\n1. An account with this email hasn't already been authenticated\n2. All fields are filled in\n3. Your email and special code are valid\n4. Your password is at least 6 characters long\n")
                    });
                }
            }).then(() => {
        if (allowSignup) {
            this.props.signup();
        } else if (!alreadyAlerted) {
            Alert.alert("Error", "Please make sure:\n1. An account with this email hasn't already been authenticated\n2. All fields are filled in\n3. Your email and special code are valid\n4. Your password is at least 6 characters long\n")
        }
    })
    }

    render() {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle = {{backgroundColor: '#D8DBD7'}}>
            <View style = {{paddingLeft: 10, paddingTop: 21}}>
            <Icon
            raised
            name='chevrons-left'
            type='feather'
            color='black'
            reverse = {true}
            onPress={() => this.props.navigation.navigate('Login')} />
            </View>
            <View style = {styles.screenText}>
            <Text style = {{color: "black", fontSize: 32, fontFamily: "Verdana"}}>Create Account</Text>
            <View style = {{paddingBottom: 10, paddingTop: 40}}>     
            <View style = {{width: 280}}>
            <Input
                leftIcon={{ type: 'font-awesome', name: 'user' }} 
                leftIconContainerStyle = {{paddingLeft: 3, paddingRight: 14}}
                inputStyle = {{fontSize: 16}}
                autoCorrect = {false}
                value = {this.props.user.name}
                onChangeText = {(text) => this.props.updateName(text)}
                maxLength = {13}
                placeholder = "Name (First & Last)"/> 
            </View>
            </View>
            <View style = {{paddingBottom: 10, paddingTop: 10}}>      
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
            <View style = {{paddingTop: 10, paddingBottom: 10}}>      
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
            <View style = {{paddingTop: 10, paddingBottom: 40}}>  
            <View style = {{width: 280}}>  
                <Input
                leftIcon={{ type: 'material-community', name: 'onepassword' }} 
                leftIconContainerStyle = {{paddingRight: 10}}
                inputStyle = {{fontSize: 16}}
                autoCapitalize = "none"
                autoCorrect = {false}
                value = {this.props.user.code}
                onChangeText = {(text) => this.props.updateCode(text)}
                placeholder = "Special Code"/>
            </View>     
            </View>
            <Icon
            raised
            name='arrow-right'
            type='font-awesome'
            color='black'
            reverse = {true}
            onPress={() => this.handleSignUp()} />
            <View style = {{backgroundColor: '#D8DBD7', paddingBottom: 300}}></View>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)