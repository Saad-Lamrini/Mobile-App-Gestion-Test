import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, Animated } from 'react-native';
import FormContainer from './FormContainer';
import initfirebase from '../firebase';
const SignupForm = () => {
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [pw2, SetPw2] = useState();
  const auth = initfirebase.auth();
  const creercompte = (props) => {
    if (password != pw2) {
      alert('les mots de passe ne sont pas identiques');
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name, // Update display name
            // Update photo URL
          });
          alert('Compte cree avec succees');
          SetName('');
          SetPassword('');
          SetPw2('');
          SetEmail('');
          console.log(name);
          //navigation.replace('signup');
        })
        .catch((erreur) => {
          alert(erreur);
        });
    }
  };
  return (
    <FormContainer>
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Nom</Text>
      <TextInput
        value={name}
        placeholder="Entrez votre nom"
        style={{
          borderWidth: 1,
          borderColor: '#1b1b33',
          height: 35,
          borderRadius: 8,
          fontSize: 16,
          paddingLeft: 10,
          marginBottom: 20,
        }}
        onChangeText={(text) => SetName(text)}
      />
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Email</Text>
      <TextInput
        value={email}
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
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Mot de Passe</Text>
      <TextInput
        value={password}
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
        onChangeText={(text) => SetPassword(text)}
      />
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>
        Confirmez votre mot de passe
      </Text>
      <TextInput
        value={pw2}
        placeholder="******"
        secureTextEntry
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: '#1b1b33',
          height: 35,
          borderRadius: 8,
          fontSize: 16,
          paddingLeft: 10,
          marginBottom: 20,
        }}
        onChangeText={(text) => SetPw2(text)}
      />
      <TouchableOpacity
        style={{
          height: 45,
          backgroundColor: '#12CAD6',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={creercompte}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>Valider</Text>
      </TouchableOpacity>
    </FormContainer>
  );
};

export default SignupForm;
