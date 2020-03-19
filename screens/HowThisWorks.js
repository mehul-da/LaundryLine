import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import AppIntroSlider from 'react-native-app-intro-slider';
export default class HowThisWorks extends React.Component {

  _onDone = () => {
    this.props.navigation.navigate('WasherDryer');
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Icon 
        name= {item.icon}
        type= {item.type}
        color='black'
        size = {250}
        iconStyle = {{paddingTop: 90, paddingBottom: 30}}/>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
      return (
        <View 
        style={{
          position: 'absolute',
          bottom: 0,
        }}>
        <Text style = {{alignSelf: 'center', fontFamily: 'Trebuchet MS', fontWeight: 'bold', fontSize: 25, paddingBottom: 30}}>How This Works</Text>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
        />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    fontWeight: "bold",
    fontFamily: "Trebuchet MS",
    padding: 15
  }
});

const slides = [
  {
    key: 's1',
    text: 'A simple & intuitive application to simplify the process of doing laundry in college dorms.',
    backgroundColor: '#20d2bb',
    icon: 'tumble-dryer',
    type:'material-community'
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: {
      uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
];