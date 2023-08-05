import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const System = ({ id, title, imgURL, short_description, fonctionnalites }) => {
  return (
    <TouchableOpacity style={{ backgroundColor: 'white', marginRight: 9 }}>
      <Image
        style={{ height: 144, width: 140 }}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/876/876144.png',
        }}
      />
      <View style={{ padding: 12, paddingBottom: 8 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, paddingTop: 6 }}>
          {title}
        </Text>
        <View></View>
      </View>
    </TouchableOpacity>
  );
};

export default System;
