import React from 'react';
import { Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Text>Go to sign-up page!</Text>
        <Button
          title="SIGN UP"
        />
      </View>
    );
  }
}