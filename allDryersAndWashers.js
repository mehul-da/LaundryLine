import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ChangingWasher from './changingWasher.js';
import ChangingDryer from './changingDryer.js';

function AllDryersAndWashers() {

  return (
    <View style = {{paddingTop: 40}}>
      <View>
        <View style = {styles.washersOne}>
          <View style = {styles.individualDryerWasher}>
            <ChangingWasher/>
          </View>
          <View style = {styles.individualDryerWasher}>
            <ChangingWasher/>
          </View>
        </View>
        <View style = {styles.washersTwo}>
          <View style = {styles.individualDryerWasher}>
            <ChangingWasher/>
          </View>
          <View style = {styles.individualDryerWasher}>
            <ChangingWasher/>
          </View>
        </View>
      </View>
      <View>
        <View style = {styles.dryersOne}>
          <View style = {styles.individualDryerWasher}>
            <ChangingDryer/>
          </View>
          <View style = {styles.individualDryerWasher}>
            <ChangingDryer/>
          </View>
        </View>
        <View style = {styles.dryersTwo}>
          <View style = {styles.individualDryerWasher}>
            <ChangingDryer/>
          </View>
          <View style = {styles.individualDryerWasher}>
            <ChangingDryer/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  washersOne: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 35
  },
  washersTwo: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 20
  },
  dryersOne: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 60,
  },
  dryersTwo: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 20,
  },
  individualDryerWasher: {
    paddingHorizontal: 10
  }
})

export default AllDryersAndWashers;