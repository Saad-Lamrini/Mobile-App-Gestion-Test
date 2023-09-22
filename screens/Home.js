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
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';

import initfirebase from '../firebase';
import Project from '../components/Project';
import { Button, Input } from 'react-native-elements';
import NotifListItem from '../components/NotifListItem';
const Home = ({ navigation }) => {
  const data1 = [
    { label: 'Yassine', value: 'Chefkaoui' },
    { label: 'Saad', value: 'Lamrini' },
    { label: 'Ahlam', value: 'Mira' },
    { label: 'Kenza', value: 'Nkhili' },
    { label: 'Salah', value: 'Aoussar' },
    { label: 'Ayoub', value: 'Mesraf' },
  ];
  const [value, setValue] = useState(null);
  const [notif, setNotif] = useState(null);
  const [objeet, setObjeet] = useState(null);
  const db = initfirebase.firestore();
  // const [data, setData] = useState([]);
  const auth = initfirebase.auth();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
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
              if (auth.currentUser.displayName === 'Yassine') {
                setShowModal2(true);
              } else {
                setShowModal(true);
              }
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
  const createNotif = async () => {
    await db
      .collection('notifications')
      .add({ destinataire: value, contenu: notif, objet: objeet })
      .then(() => {
        alert('created');
        setNotif(null);
        setValue(null);
        setObjeet(null);
      })
      .catch((erreur) => {
        alert(erreur);
      });
  };
  return (
    <SafeAreaView>
      <Modal transparent={true} visible={showModal2}>
        <View
          style={{
            // backgroundColor: 'red',
            // justifyContent: 'center',
            //alignItems: 'center',
            paddingTop: 10,
            //marginBottom: 10,
            height: 440,
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
                setShowModal2(false);
                setValue(null);
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
            <Dropdown
              style={{
                margin: 16,
                height: 40,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
              }}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={{ fontSize: 16 }}
              inputSearchStyle={{ height: 40, fontSize: 16 }}
              iconStyle={{ width: 20, height: 20 }}
              data={data1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choisir user"
              searchPlaceholder="Recherch..."
              value={value}
              onChange={(item) => {
                setValue(item.label);
                console.log(value);
              }}
            />
            <TextInput
              style={{ height: 50, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={(text) => {
                setObjeet(text);
              }}
              value={objeet}
              placeholder="Saisir objet ..."
            />
            <TextInput
              style={{ height: 100, margin: 12, borderWidth: 1, padding: 10 }}
              onChangeText={(text) => {
                setNotif(text);
              }}
              value={notif}
              multiline
              numberOfLines={4}
              placeholder="Saisir notification ..."
            />
            <TouchableOpacity
              onPress={createNotif}
              style={{
                backgroundColor: 'white',
                height: 40,
                width: 150,
                marginLeft: 80,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ paddingTop: 8, paddingLeft: 18 }}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/9679/9679185.png',
                    }} // Replace with your image file
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                </View>
                <Text>Envoyer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
                if (data.destinataire === auth.currentUser.displayName) {
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
        {projets.map(({ id, data }) => (
          <Project
            key={id}
            title={data.nom}
            description={data.description}
            id={id}
            navigate={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
