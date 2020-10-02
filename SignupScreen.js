import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements';
import SignupNameTextInput from './SignupName';
import SignupPasswordTextInput from './SignupPassword';
import SpecialCodeTextInput from './components/SpecialCodeInput';

export default function SignupScreen({ navigation }) {
    return (
        <KeyboardAwareScrollView
        contentContainerStyle={styles.screenText}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        >
        <Text style = {{color:"white", fontSize: 25, fontWeight: "bold"}}> Sign Up </Text>
        <View style = {{paddingBottom: 10, paddingTop: 20}}>      
        <SignupNameTextInput/>
        </View>
        <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
            <SignupPasswordTextInput/>
        </View>
        <View style = {{paddingBottom: 10, paddingTop: 10, paddingBottom: 15}}>      
            <SpecialCodeTextInput/>
        </View>
        <Button color = "white" title = "Create account!" style = {{width: 200, paddingTop: 8}}
        onPress={() => navigation.navigate('Washers and Dryers')}>
        </Button>
        </KeyboardAwareScrollView>
    );
}


