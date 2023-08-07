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

        <Image
          style={{ height: 20, width: 20 }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/271/271226.png',
          }}
        />
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
        {system.map(
          ({ id, data }) => (
            console.log(data.nom, id, data.documentation),
            (
              <System
                title={data.nom}
                id={id}
                imgURL={data.imgURL}
                description={data.documentation}
                navigate1={navigate}
              />
            )
          )
        )}
        {/* <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" /> */}
      </ScrollView>
    </View>
  );
};

export default Project;
