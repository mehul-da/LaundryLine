import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import Firebase from '../config/FireBase.js'

class Home extends React.Component {
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
        <View style = {{alignItems: "center", paddingTop: 30}}>
        <Text style = {{color:"black", fontSize: 30, fontWeight: "bold", fontFamily: "Trebuchet MS"}}>Welcome to</Text>
        <Text style = {{color:"black", fontSize: 30, fontWeight: "bold", fontFamily: "Trebuchet MS", paddingBottom: 20}}>LaundryLine!</Text>
        <Button color = "white" title = "Log out" style = {{width: 100, paddingTop: 8}}
        buttonStyle = {{backgroundColor: 'black', borderRadius: 15}}
        onPress={this.handleSignout} />
        <View style = {{paddingTop: 180, paddingBottom: 10}}>
        </View>
        <Icon
            raised
            name='local-laundry-service'
            type='material-icons'
            color= 'black'
            reverse = {true}
            onPress={() => this.props.navigation.navigate('WasherDryer')} />
        </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)
