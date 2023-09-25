import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import System from './System';
import initfirebase from '../firebase';
import { useLayoutEffect } from 'react';
import { Button } from 'react-native-elements';
const Project = ({ title, description, id, navigate }, props) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const projet = id;
  const [system, SetSystem] = useState([]);
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('projets')
      .doc(id)
      .collection('systems')

      .onSnapshot((snapshot) =>
        SetSystem(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);
  return (
    <View style={{}}>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 7,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{title}</Text>
        <View style={{ flexDirection: 'row', padding: 2 }}>
          {/* Vérifiez si l'utilisateur est "saad" avant d'afficher le bouton */}
          {auth.currentUser && auth.currentUser.displayName === 'Saad' && (
            <View style={{ paddingRight: 10, paddingTop: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate('Avancement', {
                    id: id,
                    navigate2: navigate,
                  });
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/3446/3446795.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {auth.currentUser && auth.currentUser.displayName === 'Saad' && (
            <View style={{ paddingRight: 10, paddingTop: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate('Priorite', { id: id });
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/4014/4014721.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('recette', { titre: title, id: id });
            }}
          >
            <View
              style={{
                //paddingRight: 24,
                width: 110,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderWidth: 1, // Largeur de la bordure en pixels
                borderColor: 'black', // Couleur de la bordure
                // padding: 10, // Espace intérieur pour dégager la bordure
                borderRadius: 8, // Rayon des coins de la bordure
                //marginBottom: 20,
              }}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2916/2916315.png',
                }}
              />
              <Text
                style={{ paddingLeft: 6, fontWeight: 'bold', fontSize: 15 }}
              >
                Recette
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ paddingLeft: 10, paddingTop: 2 }}>
            <Image
              style={{ height: 20, width: 20 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/271/271226.png',
              }}
            />
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 13,
          color: 'rgba(73, 67, 70, 0.8)',
          paddingLeft: 7,
          paddingRight: 7,
        }}
      >
        {description}
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 7,
        }}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 7 }}
      >
        {system.map(({ id, data }) => (
          <System
            key={id}
            title={data.nom}
            id={id}
            imgURL={data.imgURL}
            description={data.documentation}
            navigate1={navigate}
            auth1={auth}
            projet={projet}
          />
        ))}
        {/* <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" /> */}
      </ScrollView>
    </View>
  );
};

export default Project;
