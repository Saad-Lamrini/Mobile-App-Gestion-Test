import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
import Project from '../components/Project';
const Home = ({ navigation }) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const [projets, setProjets] = useState([]);
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
  useEffect(() => {
    const unsubscribe = db.collection('projets').onSnapshot((snapshot) =>
      setProjets(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);
  return (
    <SafeAreaView>
      <StatusBar style="green" />
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
        {/* <Project title="test" description="testing" id="12" />
        <Project title="test" description="testing" id="12" />
        <Project title="test" description="testing" id="12" /> */}
        {projets.map(
          ({ id, data: { nom } }) => (
            console.log(nom, id),
            (<Project title={nom} description="testing" id={id} />)
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
