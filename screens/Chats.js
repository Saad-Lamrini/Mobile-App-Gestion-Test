import {
  View,
  Text,
  SafeAreaView,
  ScrollViewBase,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import initfirebase from '../firebase';
import { Snackbar } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import { Button, Input } from 'react-native-elements';

const Chats = ({ navigation }) => {
  const [input, setInput] = useState('');
  const db = initfirebase.firestore();
  const [error, setError] = useState('');
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'chats',

      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 4,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ paddingTop: 16 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: 18,
              paddingLeft: 50,
            }}
          >
            Conversation
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <View style={{ paddingTop: 6 }}>
              <Image
                style={{ height: 24, width: 24, marginRight: 12 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/6402/6402530.png',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
          >
            <View style={{ paddingTop: 8 }}>
              <Image
                style={{ height: 21, width: 21, marginRight: 10 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828817.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('conversation', {
      id,
      chatName,
    });
  };
  const createChat = async () => {
    await db
      .collection('chats')
      .add({ chatName: input })
      .then(() => {
        console.log({ input });
        setShowModal(false);
        setInput('');
        setError('Conversation est crée');
      })
      .catch((erreur) => {
        alert(erreur);
      });
  };

  return (
    <SafeAreaView className="">
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,
            height: 240,
            width: '65%',
            marginLeft: 70,
            marginTop: 210,
            backgroundColor: 'rgba(39, 132, 245, 0.81)',
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            overflow: 'hidden',
          }}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Input
              inputContainerStyle={{
                width: '80%',
                height: 40,
                marginBottom: 20,
                borderBottomColor: 'white',
              }}
              inputStyle={{ color: 'white' }}
              placeholderTextColor="white"
              placeholder="Entrer a chat name"
              value={input}
              onChangeText={(texte) => {
                setInput(texte);
              }}
              leftIcon={
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 4,
                    paddingBottom: 10,
                  }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/566/566718.png',
                  }}
                />
              }
            />
          </View>
          <View style={{ paddingBottom: 30, flexDirection: 'row' }}>
            <View style={{ marginRight: 20 }}>
              <Button
                title="Ajouter"
                disabled={!input}
                onPress={createChat}
                containerStyle={{ marginBottom: 10 }}
                buttonStyle={{ backgroundColor: 'black' }}
              />
            </View>
            <Button
              title="Annuler"
              onPress={() => {
                // Add your logic here when "Ajouter" button is pressed
                setInput('');
                setShowModal(false);
              }}
              containerStyle={{ marginBottom: 10 }}
              buttonStyle={{ backgroundColor: 'black' }}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        {chats.map(
          ({ id, data: { chatName } }) => (
            console.log(chatName, id),
            (
              <CustomListItem
                key={id}
                id={id}
                chatName={chatName}
                enterChat={enterChat}
              />
            )
          )
        )}
      </ScrollView>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  errorSnackbar: {
    backgroundColor: 'green', // Couleur de fond du message d'erreur
  },
});
export default Chats;
