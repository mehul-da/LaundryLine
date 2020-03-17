import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../actions/user';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
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
        this.props.signup();
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
            <Text style = {{color:"black", fontSize: 25, fontWeight: "bold"}}> Sign Up </Text>
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
            <View style = {{paddingBottom: 10, paddingTop: 8, paddingBottom: 15}}>      
            <TextInput
            style={{ width: 200, height: 40, borderRadius: 10, borderWidth: 2, borderColor: "black", color: "black", paddingLeft: 5}}
            placeholder = " Special Code"
            autoCapitalize = "none"
            autoCorrect = {false}
            onChangeText = {(text) => this.setState({code: text})}
            placeholderTextColor = "black"/>
            </View>
            <Button titleStyle = {{fontWeight: "bold"}}  color = "black" title = "Create account!" style = {{width: 170, paddingTop: 8}} 
            buttonStyle = {{borderRadius: 15, backgroundColor: "black"}}
            onPress={() => this.handleSignUp()}>
            </Button>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup)