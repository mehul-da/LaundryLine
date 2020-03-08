import * as React from 'react';
import { TextInput } from 'react-native';

export default function LoginPasswordTextInput() {
    return (
      <TextInput
        style={{width: 200, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "white", color: "white", paddingLeft: 5}}
        placeholder = " Password"
        placeholderTextColor = "white"
      />
    ); 
  }
