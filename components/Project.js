import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import System from './System';
import initfirebase from '../firebase';
import { useLayoutEffect } from 'react';
const Project = ({ title, description, id, navigate }, props) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
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
