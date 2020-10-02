import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginNameTextInput from './LoginName';
import LoginPasswordTextInput from './LoginPassword';
import { Button } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
    return (
        <KeyboardAwareScrollView
        contentContainerStyle={styles.screenText}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View style = {{paddingBottom: 20}}>
            <Image source = {require('./logo.png')} style = {{width: 180, height: 180, alignSelf: 'center'}}/>
        </View>
        <Text style = {{color: "white", fontSize: 25, fontWeight: "bold"}}>LaundryLine</Text>
        <View style = {{paddingBottom: 10, paddingTop: 20}}>      
            <LoginNameTextInput/>
        </View>
        <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
            <LoginPasswordTextInput/>
        </View>
        <Button color = "white" title = "Login" style = {{width: 200, paddingTop: 8}}
          onPress={() => navigation.navigate('Washers and Dryers')}>
        </Button>
        <View style = {{paddingTop: 18}}>
        <Text style = {{fontSize: 11, color:"white", textAlign: "center"}}> Don't have an account yet? </Text>
        <Text style={{fontSize: 11, color:"rgb(245,92,92)", textAlign: "center"}} onPress={()=> navigation.navigate('Sign Up')}> Sign Up </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(124, 102, 154 )',
        justifyContent: 'center'
    }
})