import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SignUp extends React.Component {
  render() {
    return (
      <View>
        Go back to the home page!
        <Button
          title="GO BACK"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}