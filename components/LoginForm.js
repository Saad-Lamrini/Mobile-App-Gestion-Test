import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import FormContainer from './FormContainer';
import { Snackbar } from 'react-native-paper';
import initfirebase from '../firebase';
const LoginForm = (props) => {
  const [email, SetEmail] = useState();
  const [password, Setpassword] = useState();
  const auth = initfirebase.auth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // props.nav.replace('home', {
        //   prenom: auth.currentUser.displayName,
        // });
        console.log(auth.currentUser.displayName);
      }
    });
    return unsubscribe;
  }, []);
  const onclicking = () => {
    if (!isValidEmail(email)) {
      setError("L'adresse e-mail n'est pas valide");
    } else {
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
  };

  return (
    <FormContainer>
      <Text style={{ fontWeight: 'bold', paddingBottom: 5 }}>Email:</Text>
      <TextInput
        keyboardType="email-address"
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          placeholder="******"
          secureTextEntry={!showPassword}
          style={{
            borderWidth: 1,
            borderColor: '#1b1b33',
            height: 35,
            borderRadius: 8,
            fontSize: 16,
            paddingLeft: 10,
            marginBottom: 20,
            width: 320,
          }}
          onChangeText={(text) => Setpassword(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/159/159604.png',
            }}
            style={{
              width: 24,
              height: 24,
              marginHorizontal: 10,
              marginBottom: 20,
              tintColor: showPassword ? 'black' : 'gray', // Change icon color based on state
            }}
          />
        </TouchableOpacity>
      </View>
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
      {error !== '' && (
        <Snackbar
          visible={error !== ''}
          onDismiss={() => setError('')}
          duration={3000} // Durée d'affichage du message d'erreur
          style={[styles.errorSnackbar, { marginBottom: 190 }]}
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
export default LoginForm;
