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
    let college = db.collection('codes').doc(String(this.props.user.code)).get().then(documentSnapshot => {
        this.setState({
            college: documentSnapshot.data().college,
            dormitory: documentSnapshot.data().dormitory,
            floor: documentSnapshot.data().floor
        })
    })
    return (
      <View>
        <View style = {{flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingTop: 30, paddingBottom: 10}}>
        <View style = {{paddingRight: 15}}>
          <Icon
              raised
              name='logout'
              type='simple-line-icon'
              color='black'
              onPress = {this.handleSignout}
              reverse = {true}
              size = {20}/>
        </View>
        <View style = {{alignItems: 'center', paddingRight: 15}}>
          <Text style = {styles.textStyle}>{this.state.college}</Text>
          <Text style = {styles.textStyle}>{this.state.dormitory}</Text>
          <Text style = {styles.textStyle}>Floor {this.state.floor}</Text> 
        </View>
        <View>
        <Icon
            raised
            name='help'
            type='entypo'
            color='black'
            reverse = {true}
            onPress = {() => this.props.navigation.navigate('HowThisWorks')}
            size = {20}/>
        </View>
      </View>
      <AllDryersAndWashers/>
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