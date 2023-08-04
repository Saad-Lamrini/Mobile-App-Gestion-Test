import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
const Home = ({ navigation }) => {
  const auth = initfirebase.auth();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'chats',
      headerLeft: () => <View></View>,
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
              fontSize: 20,
              paddingLeft: 50,
            }}
          >
            {auth?.currentUser?.displayName}
          </Text>
        </View>
      ),
      headerRight: () => (
        // spacex
        <View style={{ flexDirection: 'row' }}>
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
                style={{ height: 24, width: 24, marginRight: 10 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/4034/4034229.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <View>
      <StatusBar backgroundColor="red" />
    </View>
  );
};

export default Home;
