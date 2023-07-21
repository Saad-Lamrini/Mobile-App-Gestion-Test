import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import FormContainer from './FormContainer';
import initfirebase from '../firebase';
const LoginForm = (props) => {
  const [email, SetEmail] = useState();
  const [password, Setpassword] = useState();
  const auth = initfirebase.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.nav.replace('home', {
          prenom: auth.currentUser.displayName,
        });
        console.log(auth.currentUser.displayName);
      }
    });
    return unsubscribe;
  }, []);
  const onclicking = () => {
    if (email.length > 0 && email.includes('@')) {
      if (password.length > 5) {
        console.log('jjgjgj');
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            props.nav.replace('home', {
              prenom: auth.currentUser.displayName,
            });
          })
          .catch((erreur) => {
            alert(erreur);
          });
      }
    }
  };
  return (
    <FormContainer>
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Email:</Text>
      <TextInput
        placeholder="example@email.com"
        style={{
          borderWidth: 1,
          borderColor: '#1b1b33',
          height: 35,
          borderRadius: 8,
          fontSize: 16,
          paddingLeft: 10,
          marginBottom: 20,
        }}
        onChangeText={(text) => SetEmail(text)}
      />
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>
        Mot de passe:
      </Text>
      <TextInput
        placeholder="******"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#1b1b33',
          height: 35,
          borderRadius: 8,
          fontSize: 16,
          paddingLeft: 10,
          marginBottom: 20,
        }}
        onChangeText={(text) => Setpassword(text)}
      />
      <TouchableOpacity
        style={{
          height: 45,
          backgroundColor: '#12CAD6',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onclicking}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>Connexion</Text>
      </TouchableOpacity>
    </FormContainer>
  );
};

export default LoginForm;
