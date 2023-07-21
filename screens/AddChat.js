import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import initfirebase from '../firebase';
const AddChat = ({ navigation }) => {
  useLayoutEffect(() => {}, []);
  const [input, setInput] = useState('');
  const db = initfirebase.firestore();
  const createChat = async () => {
    await db
      .collection('chats')
      .add({ chatName: input })
      .then(() => {
        alert('created');
        console.log({ input });
        navigation.navigate('chats');
      })
      .catch((erreur) => {
        alert(erreur);
      });
  };

  return (
    <View>
      {/* headr */}
      <View
        style={{
          backgroundColor: '#0004',
          height: 48,
          marginTop: 20,
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', paddingLeft: 4 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('chats');
            }}
          >
            <View style={{ paddingTop: 16 }}>
              <Image
                style={{ height: 20, width: 20, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ paddingLeft: 4 }}>
            <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 20 }}>
              Conversation
            </Text>
          </View>
        </View>
      </View>
      {/* header */}
      {/* spacex */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 30,
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Input
            inputContainerStyle={{ width: '80%', height: 40 }}
            placeholder="Entrer a chat name"
            value={input}
            onChangeText={(texte) => {
              setInput(texte);
            }}
            leftIcon={
              <Image
                style={{ height: 20, width: 20, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/566/566718.png',
                }}
              />
            }
          />
        </View>
        <Button title="Nouvelle conversation" onPress={createChat} />
      </View>
    </View>
  );
};

export default AddChat;
