import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Washer from './Washer';
import Dryer from './Dryer';
import { Button, Icon } from 'react-native-elements';
import Firebase, { db } from '../config/Firebase'
import { connect } from 'react-redux'
import { documentDirectory } from 'expo-file-system';

class SixDryersAndWashers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      w1: false,
      w2: false,
      w3: false,
      d1: false,
      d2: false,
      d3: false
    }
  }
    
  sizeOfDryer = 105;

  render() {
    const ok = db.collection('codes').doc(String(this.props.user.code)).get().then(documentSnapshot => {
      this.setState({
        w1: documentSnapshot.data().w1,
        w2: documentSnapshot.data().w2,
        w3: documentSnapshot.data().w3,
        d1: documentSnapshot.data().d1,
        d2: documentSnapshot.data().d2,
        d3: documentSnapshot.data().d3 })});

    return (
        <View>
        <View>
          <View style = {styles.firstRow}>
            <View style = {styles.individualDryerWasher}>
              <Washer size = {this.sizeOfDryer} occupied = {this.state.w1} washName = {1} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
            <View style = {styles.individualDryerWasher}>
              <Dryer size = {this.sizeOfDryer} occupied = {this.state.d1} dryerName = {1} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
          </View>
        </View>
        <View>
          <View style = {styles.secondRow}>
            <View style = {styles.individualDryerWasher}>
              <Washer size = {this.sizeOfDryer} occupied = {this.state.w2} washName = {2} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
            <View style = {styles.individualDryerWasher}>
              <Dryer size = {this.sizeOfDryer} occupied = {this.state.d2} dryerName = {2} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
          </View>
        </View>
        <View>
          <View style = {styles.thirdRow}>
            <View style = {styles.individualDryerWasher}>
              <Washer size = {this.sizeOfDryer} occupied = {this.state.w3} washName = {3} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
            <View style = {styles.individualDryerWasher}>
              <Dryer size = {this.sizeOfDryer} occupied = {this.state.d3} dryerName = {3} name = {String(this.props.user.name)} code = {String(this.props.user.code)}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 80
  },
  secondRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 20,
  },
  thirdRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    paddingTop: 20,
  },
  individualDryerWasher: {
    paddingHorizontal: 10
  }
})

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(SixDryersAndWashers);