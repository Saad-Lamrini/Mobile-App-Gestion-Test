import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const System = ({
  id,
  title,
  imgURL,
  description,
  fonctionnalites,
  navigate1,
  auth1,
  projet,
}) => {
  const params = {
    titre: { title },
    description: { description },
  };
  console.log(title);
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'white', marginRight: 9 }}
      onPress={() => {
        if (auth1.currentUser.displayName == 'Elhassan') {
          navigate1.navigate('documentatio', {
            titre: title,
            documentation: description,
            id: id,
            auth: auth1,
            navigation2: navigate1,
            projet: projet,
          });
        } else {
          navigate1.navigate('documentation', {
            titre: title,
            documentation: description,
            id: id,
            auth: auth1,
          });
        }
      }}
    >
      <View style={{ paddingTop: 4 }}>
        <Image
          style={{
            height: 110,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={{
            uri: imgURL,
          }}
        />
      </View>
      <View
        style={{
          padding: 8,
          paddingBottom: 8,
          backgroundColor: 'rgba(0, 159, 255, 0.8)',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            paddingTop: 6,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        <View></View>
      </View>
    </TouchableOpacity>
  );
};

export default System;
