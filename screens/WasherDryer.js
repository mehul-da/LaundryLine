import * as React from 'react';
import AllDryersAndWashers from '../allDryersAndWashers.js';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class WasherDryer extends React.Component {
    render() {
    return (
      <View>
      <View style = {{paddingTop: 15, alignItems: 'center'}}>
      <Icon
              raised
              name='home'
              type='fant-awesome'
              color='black'
              reverse = {true}
              onPress={() => this.props.navigation.navigate('Home')} />
      </View>
      <AllDryersAndWashers/>
      </View>
    );
  }
}

export default WasherDryer;