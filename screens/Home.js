import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
import Project from '../components/Project';
import { Button, Input } from 'react-native-elements';
import NotifListItem from '../components/NotifListItem';
const Home = ({ navigation }) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const [showModal, setShowModal] = useState(false);
  const [projets, setProjets] = useState([]);
  const [notification, setNotification] = useState([]);
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
              setShowModal(true);
            }}
          >
            <View style={{ paddingTop: 8 }}>
              <Image
                style={{ height: 24, width: 24, marginRight: 10 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2058/2058148.png',
                }}
              />
            </View>
          </TouchableOpacity>
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
  useEffect(() => {
    const unsubscribe = db.collection('notifications').onSnapshot((snapshot) =>
      setNotification(
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
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            // backgroundColor: 'red',
            // justifyContent: 'center',
            //alignItems: 'center',
            paddingTop: 10,
            //marginBottom: 10,
            height: 540,
            width: '80%',
            marginLeft: 40,
            marginTop: 110,
            backgroundColor: 'rgba(255, 213, 27, 1)',
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: 30,
              //backgroundColor: 'black',
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 25,
                paddingLeft: 10,
                fontWeight: 'bold',
              }}
            >
              Notifications
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
            >
              <View style={{ paddingTop: 4, paddingLeft: 125 }}>
                <Image
                  style={{ height: 28, width: 28, marginRight: 10 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/6276/6276642.png',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10 }}>
            <ScrollView>
              {notification.map(({ id, data }) => {
                if ((data.destinataire = auth.currentUser.displayName)) {
                  return (
                    <NotifListItem
                      objet={data.objet}
                      Content={data.contenu}
                      key={id}
                      id={id}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <StatusBar style="green" />
      {/* Search */}
      <View style={{ height: 5 }}></View>
      <View
        style={{
          marginLeft: 5,
          flexDirection: 'row',
          paddingTop: 4,
          backgroundColor: 'rgba(39, 209, 245, 0.4)',
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
        {projets.map(
          ({ id, data }) => (
            console.log(data.nom, id),
            (
              <Project
                key={id}
                title={data.nom}
                description={data.description}
                id={id}
                navigate={navigation}
              />
            )
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
