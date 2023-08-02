import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import initfirebase from '../firebase';

const Conversation = ({ navigation, route }) => {
  const db = initfirebase.firestore();
  const [input, setInput] = useState('');
  const [messages, SetMessages] = useState([]);
  const auth = initfirebase.auth();
  const senMessg = () => {
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection('messages').add({
      messageText: input,
      email: auth.currentUser.email,
      sender: auth.currentUser.displayName,
      timestampField: new Date(),
    });

    setInput('');
  };
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
            width: 80,
            flex: 1,
          }}
        >
          <Text>{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        // spacex
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ paddingRight: 15, paddingBottom: 12 }}>
            <View style={{ paddingTop: 16 }}>
              <Image
                style={{ height: 24, width: 24, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/711/711245.png',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingRight: 5 }}>
            <View style={{ paddingTop: 16, marginRight: 4 }}>
              <Image
                style={{ height: 20, width: 20, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/126/126341.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),

      //headerTransparent: true,
    });
  }, [navigation, messages]);
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestampField', 'asc')
      .onSnapshot((snapshot) =>
        SetMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="green" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={{}}>
                    <Text
                      style={{
                        padding: 12,
                        backgroundColor: '#2B68',
                        alignSelf: 'flex-end',
                        borderRadius: 20,
                        marginRight: 15,
                        marginBottom: 10,
                        maxWidth: '80%',
                        position: 'relative',
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>Vous: </Text>
                      {data.messageText}
                    </Text>
                  </View>
                ) : (
                  <View styles={{}}>
                    <Text
                      style={{
                        padding: 12,
                        backgroundColor: '#2B68E6',
                        alignSelf: 'flex-start',
                        borderRadius: 20,
                        marginLeft: 15,
                        marginBottom: 10,
                        maxWidth: '80%',
                        position: 'relative',
                      }}
                    >
                      {' '}
                      <Text style={{ fontWeight: 'bold' }}>
                        {data.sender}:{' '}
                      </Text>
                      {data.messageText}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                padding: 15,
              }}
            >
              <TextInput
                placeholder="entrer votre message"
                style={{
                  bottom: 0,
                  height: 40,
                  flex: 1,
                  marginRight: 15,

                  backgroundColor: '#ECECEC',

                  padding: 10,
                  borderRadius: 30,
                  color: 'grey',
                }}
                onChangeText={(text) => setInput(text)}
                value={input}
              />
              <TouchableOpacity onPress={senMessg} activeOpacity={0.5}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/6826/6826401.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Conversation;
