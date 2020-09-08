import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/FireBase.js'

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D8DBD7'
    },
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

class Verification extends React.Component {

    constructor(props) {
        super(props);
    }

    handleNextAndSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <KeyboardAwareScrollView
            contentContainerStyle={styles.screenText}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
            <View style = {{paddingTop: 90, paddingBottom: 130}}>
                <Text style = {{color: "black", fontSize: 29, fontWeight: "bold", fontFamily: "Trebuchet MS"}}>Email Verification</Text>
            </View>
            <View style = {{padding: 20, paddingBottom: 50}}>
                <Text style = {{textAlign: 'center', color: "black", fontSize: 20, fontFamily: "Trebuchet MS"}}>An email has been sent to {this.props.user.email}. 
                Please click on the link in the email to verify the address. 
                Once that has been done, please log in again. Thank you!</Text>
            </View>
            <Button title = "Exit" titleStyle = {{fontSize: 22, fontFamily: 'Trebuchet MS'}} buttonStyle = {{backgroundColor: 'black'}} onPress = {this.handleNextAndSignout}/>
          </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps
)(Verification)


