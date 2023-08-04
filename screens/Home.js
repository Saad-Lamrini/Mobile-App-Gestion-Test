import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
import Project from '../components/Project';
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
    <SafeAreaView>
      <StatusBar backgroundColor="red" />
      {/* Search */}
      <View style={{ height: 5 }}></View>
      <View
        style={{
          marginLeft: 5,
          flexDirection: 'row',
          paddingTop: 4,
          backgroundColor: 'red',
          height: 40,
          width: 360,
          padding: 5,
        }}
      >
        <View style={{ paddingTop: 8, marginLeft: 1 }}>
          <Image
            style={{ height: 18, width: 18 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/622/622669.png',
            }}
          />
        </View>
        <TextInput
          placeholder="projets"
          keyboardType="default"
          style={{ width: 328, marginLeft: 9 }}
        />
        <View style={{ paddingTop: 8, marginLeft: 4 }}>
          <Image
            style={{ height: 18, width: 18 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/876/876144.png',
            }}
          />
        </View>
      </View>
      {/* Search */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Project title="test" description="testing" id="12" />
        <Project title="test" description="testing" id="12" />
        <Project title="test" description="testing" id="12" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
