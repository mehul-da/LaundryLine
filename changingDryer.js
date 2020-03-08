import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';


class ChangingDryer extends React.Component {
  available = require('./Dryer_GREEN.png')
  occupied = require('./Dryer_RED.png');

  constructor() {
    super();
    this.state = { showAvailable: true };
  }

  renderImage() {
    var imgSource = this.state.showAvailable? this.available : this.occupied;
    return (
      <Image style = {{width: 105, height: 105, alignSelf: 'center'}} 
        source={ imgSource }
      />
    );
  }
  render(){
    return (
        <View>
          <TouchableOpacity onPress={ () => this.setState({ showAvailable: !this.state.showAvailable }) }>
            {this.renderImage()}
          </TouchableOpacity>
        </View>
    );
  }
}

export default ChangingDryer;