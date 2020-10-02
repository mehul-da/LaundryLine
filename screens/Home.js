import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import Firebase, { db } from '../config/Firebase.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            college: "",
            dormitory: "",
            floor: ""
        }
    }

    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        let college = db.collection('codes').doc(String(this.props.user.code)).get().then(documentSnapshot => {
            this.setState({
                college: documentSnapshot.data().college,
                dormitory: documentSnapshot.data().dormitory,
                floor: documentSnapshot.data().floor
            })
        })
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
        <View style = {{alignItems: 'center', paddingTop: 80}}>
        <Text >{this.state.college}</Text>
        <Text >{this.state.dormitory}</Text>
        <Text >Floor {this.state.floor}</Text> 
        </View>
        </View>
    );
  }
}
