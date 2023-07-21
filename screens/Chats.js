import {
  View,
  Text,
  SafeAreaView,
  ScrollViewBase,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import initfirebase from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Chats = ({ navigation }) => {
  const db = initfirebase.firestore();
  const [chats, setChats] = useState([]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'signal',
  //     headerStyle: { backgroundColor: '#fff' },
  //     headerTintColor: 'black',
  //     headerRight: () => {

  //     },
  //   });
  // }, []);

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

  return (
    <SafeAreaView className="">
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
              navigation.replace('home');
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
        {/* //spacex2 */}
        <View style={{ flexDirection: 'row', marginRight: 8 }}>
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => {}}>
            <View style={{ paddingTop: 16 }}>
              <Image
                style={{ height: 24, width: 24, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/6402/6402530.png',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.replace('addchats');
            }}
          >
            <View style={{ paddingTop: 20 }}>
              <Image
                style={{ height: 16, width: 16, marginRight: 4 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828911.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    </SafeAreaView>
  );
};

export default Chats;
