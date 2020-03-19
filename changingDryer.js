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

  renderImage = () => {
    var imgSource = !this.props.occupied ? this.available : this.taken;
    if (imgSource == this.taken) {
      return (
        <View>
        <Image style = {{width: 105, height: 105, alignSelf: 'center'}} 
          source={ imgSource }
        />
        <Text>{this.props.name}</Text>
        </View>
      );
    } else {
      return (
        <Image style = {{width: 105, height: 105, alignSelf: 'center'}} 
          source={ imgSource }
        />
      );
    }
  }

  handleUpdate = () => {
    const value = this.props.dryerName
    if (value == 1) {
      db.collection('codes').doc(this.props.code).update({
        d1: !this.state.status
      })
    } else if (value == 2) {
      db.collection('codes').doc(this.props.code).update({
        d2: !this.state.status
      })
    } else if (value == 3) {
      db.collection('codes').doc(this.props.code).update({
        d3: !this.state.status
      })
    } else if (value == 4) {
      db.collection('codes').doc(this.props.code).update({
        d4: !this.state.status
      })
    } 
    this.setState({status: !this.state.status})
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