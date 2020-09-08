import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Firebase, { db } from './config/FireBase';


class ChangingDryer extends React.Component {
  available = require('./Dryer_GREEN.png')
  taken = require('./Dryer_RED.png');

  constructor(props) {
    super(props);
    this.state = {
      status: this.props.occupied
    }
  }

  nameToShow = ""

  renderImage = () => {
    var imgSource = !this.props.occupied ? this.available : this.taken;
    const value = this.props.dryerName
    if (value == 1) {
      db.collection('codes').doc(String(this.props.code)).get().then(documentSnapshot => {
        this.nameToShow = documentSnapshot.data().d1
      })
    } else if (value == 2) {
      db.collection('codes').doc(String(this.props.code)).get().then(documentSnapshot => {
        this.nameToShow = documentSnapshot.data().d2
      })
    } else if (value == 3) {
      db.collection('codes').doc(String(this.props.code)).get().then(documentSnapshot => {
        this.nameToShow = documentSnapshot.data().d3
      })
    } else if (value == 4) {
      db.collection('codes').doc(String(this.props.code)).get().then(documentSnapshot => {
        this.nameToShow = documentSnapshot.data().d4
      })
    } 

    if (imgSource == this.taken) {
      return (
        <View>
        <Image style = {{width: this.props.size, height: this.props.size, alignSelf: 'center'}} 
          source={ imgSource } />
        <Text style = {{alignSelf: 'center', fontFamily: "Trebuchet MS"}}>{this.nameToShow}</Text>
        </View>
      );
    } else {
      return (
        <View style = {{paddingBottom: 20}}>
        <Image style = {{width: this.props.size, height: this.props.size, alignSelf: 'center'}} 
          source={ imgSource } />
        </View>
      );
    }
  }

  handleUpdate = () => {
    const value = this.props.dryerName
    if (value == 1) {
      if (this.state.status == "") {
        db.collection('codes').doc(this.props.code).update({
          d1: this.props.name
        })
      } else {
        db.collection('codes').doc(this.props.code).update({
          d1: ""
        })
      }
    } else if (value == 2) {
      if (this.state.status == "") {
        db.collection('codes').doc(this.props.code).update({
          d2: this.props.name
        })
      } else {
        db.collection('codes').doc(this.props.code).update({
          d2: ""
        })
      }
    } else if (value == 3) {
      if (this.state.status == "") {
        db.collection('codes').doc(this.props.code).update({
          d3: this.props.name
        })
      } else {
        db.collection('codes').doc(this.props.code).update({
          d3: ""
        })
      }
    } else if (value == 4) {
      if (this.state.status == "") {
        db.collection('codes').doc(this.props.code).update({
          d4: this.props.name
        })
      } else {
        db.collection('codes').doc(this.props.code).update({
          d4: ""
        })
      }
    } 
    if (this.state.status == "")
      this.setState({status: this.props.name})
    else
      this.setState({status: ""})
  }

  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.handleUpdate}>
            {this.renderImage()}
          </TouchableOpacity>
        </View>
    );
  }
}

export default ChangingDryer;