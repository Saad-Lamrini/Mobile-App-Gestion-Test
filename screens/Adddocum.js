import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { Button } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import initfirebase from '../firebase';
import { useState } from 'react';
const Adddocum = ({ route }) => {
  const { titre, documentation, id, auth, navigation2, projet } = route.params;
  const [text, setText] = React.useState(documentation);
  const db = initfirebase.firestore();
  const [error, setError] = useState('');
  useEffect(() => {
    // Dynamically update navigation options
    navigation2.setOptions({
      title: 'chats',
    });
  }, [navigation2]);
  const updateFieldInFirestore = async (projectId, systemId, newValue) => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titre}</Text>
      <TextInput
        multiline
        numberOfLines={50}
        style={styles.input}
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      {/* <Text style={styles.paragraph}>{documentation}</Text> */}
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="Modifier"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => {
            try {
              const documentRef = db
                .collection('projets')
                .doc(projet)
                .collection('systems')
                .doc(id);

              // Use the update method to update the specified field
              documentRef.update({
                ['documentation']: text,
              });

              setError('Documentation modifiée');
            } catch (error) {
              console.error('Error updating field:');
            }
          }}
        />
        <Button
          title="Annuler"
          buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
          containerStyle={{
            //height: 40,
            width: 150,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          titleStyle={{ color: 'white', marginHorizontal: 20 }}
          onPress={() => {
            setText(documentation);
          }}
        />
      </View>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 540,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },

  errorSnackbar: {
    backgroundColor: 'green', // Couleur de fond du message d'erreur
  },
});
export default Adddocum;
