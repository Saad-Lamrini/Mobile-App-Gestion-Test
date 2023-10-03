import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, Animated } from 'react-native';
import FormContainer from './FormContainer';
import { Snackbar } from 'react-native-paper';
import initfirebase from '../firebase';
const SignupForm = () => {
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [error, setError] = useState('');
  const [pw2, SetPw2] = useState();
  const auth = initfirebase.auth();
  const creercompte = (props) => {
    if (!isValidEmail(email)) {
      setError("L'adresse e-mail n'est pas valide");
    } else if (!name) {
      setError('veuillez specifier votre nom');
    } else if (password != pw2) {
      setError('Les mots de passe ne sont pas identiques');
    } else if (!isPasswordValid(password)) {
      setError(
        'Le mot de passe doit contenir au moins 6 caractères et être complexe.'
      );
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
  const isPasswordValid = (password) => {
    // Password should contain at least 6 characters and include at least one number
    return password.length >= 6 && /\d/.test(password);
  };
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
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
        disabled={!email}
        onPress={creercompte}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>Valider</Text>
      </TouchableOpacity>
      {error !== '' && (
        <Snackbar
          visible={error !== ''}
          onDismiss={() => setError('')}
          duration={3000} // Durée d'affichage du message d'erreur
          style={[styles.errorSnackbar, { bottom: 0 }]}
        >
          {error}
        </Snackbar>
      )}
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  errorSnackbar: {
    backgroundColor: 'red', // Couleur de fond du message d'erreur
  },
});
export default SignupForm;
