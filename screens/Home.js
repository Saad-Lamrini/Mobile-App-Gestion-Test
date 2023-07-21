import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
const Home = ({ navigation }) => {
  const auth = initfirebase.auth();
  return (
    <View>
      <StatusBar backgroundColor="red" />
      <View style={{ paddingTop: 40, flexDirection: 'row' }}>
        <Text
          style={{
            flex: 2,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 36,
          }}
        >
          Welcome {auth.currentUser.displayName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('chats');
          }}
        >
          <View style={{ paddingTop: 8 }}>
            <Image
              style={{ height: 24, width: 24, marginRight: 12 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/724/724715.png',
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace('signup');
            });
          }}
        >
          <View style={{ paddingTop: 8 }}>
            <Image
              style={{ height: 24, width: 24, marginRight: 4 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4034/4034229.png',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
