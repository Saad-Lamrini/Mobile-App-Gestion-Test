import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Applicationdocumentation = ({ route }) => {
  const { titre, documentation } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titre}</Text>

      <Text style={styles.paragraph}>{documentation}</Text>
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
});
export default Applicationdocumentation;
