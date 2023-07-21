import { View, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ width: Dimensions.get('window').width, paddingHorizontal: 20 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
