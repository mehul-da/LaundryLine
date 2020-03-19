import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateCode, signup } from '../actions/user';
import Firebase, { db } from '../config/FireBase';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, signup, updateCode }, dispatch)
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
        paddingTop: 105
    },
    homeScreen: {
      flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

class Signup extends React.Component {


    handleSignUp = () => {

        const usersRef = db.collection('codes').doc(String(this.props.user.code))
        let allowSignup = true;
            
        usersRef.get()
            .then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    console.log("start " + allowSignup)
                    allowSignup = false;
                    console.log("middle " + allowSignup)
                    usersRef.onSnapshot((doc) => {
                        Alert.alert("Error", "Please make sure:\n1. An account with this email hasn't already been authenticated\n2. All fields are filled in\n3. Your email and special code are valid\n4. Your password is at least 6 characters long\n")
                    });
                }
            }).then(() => {
        if (allowSignup) {
            this.props.signup();
            }})
    }

    render() {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}>
            <View style = {{padding: 17}}>
            <Icon
            raised
            name='chevrons-left'
            type='feather'
            color='black'
            reverse = {true}
            onPress={() => this.props.navigation.navigate('Login')} />
            </View>
            <View style = {styles.screenText}>
            <Text style = {{color:"black", fontSize: 25, fontWeight: "bold", fontFamily: "Trebuchet MS"}}> Sign Up </Text>
            <View style = {{paddingBottom: 10, paddingTop: 20}}>      
            <TextInput
            style={{width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Email"
            placeholderTextColor = "black"
            autoCapitalize = "none"
            value = {this.props.user.email}
            onChangeText = {(text) => this.props.updateEmail(text)}
            autoCorrect = {false}/>
            </View>
            <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
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
            <View style = {{paddingBottom: 10, paddingTop: 6, paddingBottom: 15}}>      
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
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)