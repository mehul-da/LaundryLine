import * as React from 'react';
import AllDryersAndWashers from '../allDryersAndWashers.js';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import Firebase, { db } from '../config/FireBase.js'

class WasherDryer extends React.Component {
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
    db.collection('codes').doc(String(this.props.user.code)).get().then(documentSnapshot => {
        this.setState({
            college: documentSnapshot.data().college,
            dormitory: documentSnapshot.data().dormitory,
            floor: documentSnapshot.data().floor
        })
    })
    return (
      <View style = {{backgroundColor: '#D8DBD7'}}>
        <View style = {{flexDirection: "row", alignItems: "center", paddingTop: 30, paddingBottom: 10}}>
        <View style = {{paddingLeft: 12}}>
          <Icon
              raised
              name='logout'
              type='simple-line-icon'
              color='black'
              size = {20}
              onPress = {this.handleSignout}
              reverse = {true}/>
          <Text style = {{fontSize: 9, alignSelf: 'center'}}>LOG OUT</Text>
        </View>
        <View style = {{alignItems: 'center', paddingLeft: 11, paddingRight: 11}}>
          <Text style = {styles.textStyle}>{this.state.college}</Text>
          <Text style = {styles.textStyle}>{this.state.dormitory}</Text>
          <Text style = {styles.textStyle}>Floor {this.state.floor}</Text> 
        </View>
        <View style = {{paddingRight: 12}}>
        <Icon
            raised
            name='help'
            type='entypo'
            color='black'
            reverse = {true}
            onPress = {() => this.props.navigation.navigate('HowThisWorks')}
            size = {20}/>
            <Text style = {{fontSize: 9, alignSelf: 'center'}}>HELP</Text>
        </View>
      </View>
      <AllDryersAndWashers/>
      <View style = {{backgroundColor: '#D8DBD7', paddingBottom: 100}}></View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Trebuchet MS",
    fontSize: 16,
    fontWeight: "bold"
  }
})

export default connect(mapStateToProps)(WasherDryer)