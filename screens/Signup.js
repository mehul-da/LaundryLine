import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateCode, updateName, signup } from '../actions/user';
import Firebase, { db } from '../config/FireBase';

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
        paddingTop: 105,
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
            
        usersRef.get()
            .then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    allowSignup = false;
                    usersRef.onSnapshot((doc) => {
                        Alert.alert("Error", "Please make sure:\n1. An account with this email hasn't already been authenticated\n2. All fields are filled in\n3. Your email and special code are valid\n4. Your password is at least 6 characters long\n")
                    });
                }
            }).then(() => {
        if (allowSignup) {
            this.props.signup();
        } else {
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
            <Text style = {{fontSize: 9, paddingLeft: 20}}>BACK</Text>
            </View>
            <View style = {styles.screenText}>
            <Text style = {{color:"black", fontSize: 25, fontWeight: "bold", fontFamily: "Trebuchet MS"}}> Sign Up </Text>
            <View style = {{paddingBottom: 10, paddingTop: 20}}>      
            <TextInput
            style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Name (First & Last)"
            maxLength = {13}
            placeholderTextColor = "black"
            value = {this.props.user.name}
            onChangeText = {(text) => this.props.updateName(text)}
            autoCorrect = {false}/>
            </View>
            <View style = {{paddingBottom: 10, paddingTop: 10}}>      
            <TextInput
            style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Email"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            value = {this.props.user.email}
            onChangeText = {(text) => this.props.updateEmail(text)}
            autoCorrect = {false}/>
            </View>
            <View style = {{paddingTop: 10, paddingBottom: 15}}>      
            <TextInput
            secureTextEntry = {true}
            password = {true}
            style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Password"
            value = {this.props.user.password}
            autoCapitalize = "none"
            autoCorrect = {false}
            onChangeText = {(text) => this.props.updatePassword(text)}
            placeholderTextColor = "black"/>
            </View>
            <View style = {{paddingTop: 6, paddingBottom: 15}}>      
            <TextInput
            style={{ width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Special Code"
            autoCapitalize = "none"
            autoCorrect = {false}
            value = {this.props.user.code}
            onChangeText = {(text) => this.props.updateCode(text)}
            placeholderTextColor = "black"/>
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