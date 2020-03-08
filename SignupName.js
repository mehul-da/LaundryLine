import * as React from 'react';
import { TextInput } from 'react-native';

export default function SignupNameTextInput() {
    return (
      <TextInput
        style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white"}}
        placeholder = "  Username"
        placeholderTextColor = "white"
        
      />
    );
}

